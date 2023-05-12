import { Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CompaniesDTO } from './companies.dto';
import { CompaniesEntity } from './companies.entity';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { Connection, QueryRunner } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { CompanyDocumentService } from 'src/company-document/company-document.service';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(PagePermissionEntity)
    private pagePermissionRepository: Repository<PagePermissionEntity>,
    @InjectRepository(CompanyDocument)
    private companyDocumentRepository: Repository<CompanyDocument>,
    private readonly systemcodeService:SystemCodeService,
    private readonly userservice:UserService,
    private readonly companydocumentservice:CompanyDocumentService,
    private readonly mailservice:MailService,
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User> 
  ) { }

  async showAll() {
    return await this.companyRepository.find(
      {
        where: { status: 1 , mainCompany: null },
        relations: ['mainCompany','users']
      }
    );
  }

  async showonlySubCompany() {
    return await this.companyRepository.find(
      {
        where: { status: 1 , mainCompany: Not(IsNull()) },
        relations: ['mainCompany','users']
      }
    );
  }

  async showonlyActivemainCompany(value) {
    return await this.companyRepository.find(
      {
        where: { status: 1 , mainCompany: null,compstatus:value },
        relations: ['mainCompany','users']
      }
    );
  }


  async showonlyActivesubCompany(value) {
    return await this.companyRepository.find(
      {
        where: { status: 1 , mainCompany:  Not(IsNull()),compstatus:value },
        relations: ['mainCompany','users']
      }
    );
  }

  async getcountry(){
    const query = 'SELECT * FROM `country`';
    console.log(query,99999)
    const countryList = await this.connection.query(query);
    return countryList;
  }

  async showSubAll(mainCompanyId: number): Promise<CompaniesEntity[]> {
    return await this.companyRepository.find(
      {
        where: { status: 1 , mainCompany: {
          id: mainCompanyId
        }},
        relations: ['mainCompany','users']
      }
    );
  }

//   async create(companyData) {

//     const usersjj = await this.userservice.findUsingId("26");
//  console.log(usersjj,333) 
//   }


  async create(companyData) {
  
   const response=await this.systemcodeService.findOne('company')
   const companyCode=response.code+''+response.startValue   
   const newstartvalue={
     startValue:response.startValue+1
   }
   let documentUpload=[];
   if( companyData.filename[2]){
    documentUpload=companyData.filename[2]?.['files[]']
   }
   const files = documentUpload.map(documentPath => ({ documentPath }));
   console.log(files,666)
   let dataCompany;
   if(companyData.parentCompany&&companyData.parentCompany!=""){
    const company = await this.companyRepository.findOne(companyData.parentCompany, {
      relations: ['users']
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${companyData.parentCompany} not found`);
    }
    const userIds = company.users.map(user => user.id);
    console.log(companyData.sameParentCompanyAdmin)
    if(companyData.sameParentCompanyAdmin=="false"){
      console.log(companyData.parentCompany,88787)
      const existing = await this.userservice.findByEmail(companyData.email);
      if (existing) {
        console.log('dsdsd',4454)
        throw new BadRequestException('auth/account-exists');
      }
      console.log(companyData.users,889898)
      const userData={
          firstName:companyData.firstName,
          lastName:companyData.lastName,
          uType:"SADMIN",
          profilePic:companyData.filename[0].profileImg[0],
          password:companyData.password,
          phone:companyData.phone,
          email:companyData.email
      }
       const userResponse= await this.userservice.create(userData);
       const useraccount = userResponse.id.toString();   
       userIds.push(useraccount);
       console.log(userIds,5555)
    }
    const users = await this.userRepository.findByIds(userIds);
    dataCompany={
      ...companyData,
      companyLogo:companyData.filename[1].logoImg[0],
      companyCode:companyCode,
      users:users,
      mainCompany:companyData.parentCompany,
      documents:files
   }
   }else{
    const existing = await this.userservice.findByEmail(companyData.email);
    if (existing) {
      throw new BadRequestException('auth/account-exists');
    }
    console.log(companyData.users,889898)
    const userData={
     firstName:companyData.firstName,
     lastName:companyData.lastName,
     uType:"CADMIN",
     profilePic:companyData.filename[0].profileImg[0],
     password:companyData.password,
     phone:companyData.phone,
     email:companyData.email
    }
     const userResponse= await this.userservice.create(userData);
     const userIds = userResponse.id.toString();   
     const users = await this.userRepository.findByIds(userIds);
      dataCompany={
      ...companyData,
      companyLogo:companyData.filename[1].logoImg[0],
      companyCode:companyCode,
      users:users,
      documents:files
   }
    }
   
   
    await this.systemcodeService.update(response.id,newstartvalue)
    const newCompany = this.companyRepository.create(dataCompany);
    return await this.companyRepository.save(newCompany);
  

// retrieve the user entities based on the array of IDsconsole.log(users)
 
   
  //  console.log(dataCompany,666666)
    // const newcompanyData={
    //   ...companyData,
    //   companyCode:companyCode,
    //   companyLogo:companyData.filename[0].companylogo[0]
    // }
    // const profileData={
    //  firstname: companyData.firstname,
    //  lastname: companyData.lastname,
    //  email:companyData.email,
    //  password: companyData.password,
    //  profilePic: companyData.filename[1].profilepic[0]
    // }
   
   
  // return ;
  }

  async findById(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne({ id });
  }

  async getmatchsubcompany(id: number) {
    return await this.companyRepository.find(
      {
        where: { status: 1 ,mainCompany :id},
        // relations: ['mainCompany','users']
      }
    );
  }


  async read(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne(
      id, 
      { relations: ['mainCompany','users','documents','country','regAddressCountry'] },
    );
  }

  async update(id: number, data) {
   
   console.log(id);
   console.log(data,9990009)
  //  console.log(data.users[0].firstName,9990009)

   
   const passcompanyData={
    ...(data.companyName ? { companyName: data.companyName } : {}),
    ...(data.companyEmail ? { companyEmail: data.companyEmail } : {}),
    ...(data.website ? { website: data.website } : {}),
    ...(data.companyPhone ? { companyPhone: data.companyPhone } : {}),
    ...(data.number ? { number: data.number } : {}),
    ...(data.street ? { street: data.street } : {}),
    ...(data.city ? { city: data.city } : {}),
    ...(data.postalCode ? { postalCode: data.postalCode } : {}),
    ...(data.vat ? { vat: data.vat } : {}),
    ...(data.registrationNumber ? { registrationNumber: data.registrationNumber } : {}),
    ...(data.regAddressNo ? { regAddressNo: data.regAddressNo } : {}),
    ...(data.regAddressStreet ? { regAddressStreet: data.regAddressStreet } : {}),
    ...(data.regAddressCity ? { regAddressCity: data.regAddressCity } : {}),
    ...(data.regAddressPostalCode ? { regAddressPostalCode: data.regAddressPostalCode } : {}),
    ...(data.country ? { country: data.country.id } : {}),
    ...(data.companyType ? { companyType: data.companyType } : {}),
    ...(data.regAddressCountry ? { regAddressCountry: data.regAddressCountry.id } : {}),

   }
   if(data.filename){
    if(data.profile && data.logo){
      console.log(data.filename,657676)
      let documentUpload=[];
      if(data.filename[0]?.['files[]']){
        documentUpload=data.filename[0]?.['files[]']
        const files = documentUpload.map(documentPath => ({ documentPath, company:id }));
        console.log(files,898989898998)
        await this.companydocumentservice.create(files)
      }
      
     
     }
     else if(data.profile){
      const datalogo={
        ...(data.filename[0].logoImg ? { companyLogo: data.filename[0].logoImg } : {}),
      }
      await this.companyRepository.update({ id },datalogo);
      let documentUpload=[];
      if(data.filename[1]?.['files[]']){
        documentUpload=data.filename[1]?.['files[]']
        const files = documentUpload.map(documentPath => ({ documentPath, company:id }));
        console.log(files)
        await this.companydocumentservice.create(files)
      }
     
     }
     else if(data.logo){
      const dataprofilpic={
        ...(data.filename[0].profileImg ? { profilePic: data.filename[0].profileImg } : {}),
      }
      await this.userservice.update(data.userId,dataprofilpic);
      let documentUpload=[]; 
      if(data.filename[1]?.['files[]']){
        documentUpload=data.filename[1]?.['files[]']
        const files = documentUpload.map(documentPath => ({ documentPath, company:id }));
        console.log(files,898989898998)
        await this.companydocumentservice.create(files)
      }
     }
     else{
      const dataprofilpic={
        ...(data.filename[0].profileImg ? { profilePic: data.filename[0].profileImg } : {}),
      }
      await this.userservice.update(data.userId,dataprofilpic);
      const datalogo={
        ...(data.filename[1].logoImg ? { companyLogo: data.filename[1].logoImg } : {}),
      }
      await this.companyRepository.update({ id },datalogo);
      let documentUpload=[]; 
      if(data.filename[2]?.['files[]']){ 
        documentUpload=data.filename[2]?.['files[]']
        const files = documentUpload.map(documentPath => ({ documentPath, company:id }));
        console.log(files,898989898998)
        await this.companydocumentservice.create(files)
      }
     }
   }
  
   
   if(data.users){
    const passuserData={
      ...(data.users[0].firstName ? { firstName: data.users[0].firstName } : {}),
      ...(data.users[0].lastName ? { lastName: data.users[0].lastName} : {}),
      ...(data.users[0].email ? { email: data.users[0].email } : {}),
      ...(data.users[0].phone ? { phone: data.users[0].phone} : {}),
     }
     const userResponse= await this.userservice.update(data.userId,passuserData);
   }
  
  //  console.log(data['updatedFields'],5555555555)
  //  console.log(JSON.stringify(data['updatedFields']),9900909)
  console.log(passcompanyData,787878787)
  if(Object.keys(passcompanyData).length>0){
    await this.companyRepository.update({ id },passcompanyData);
  }
  
    return await this.companyRepository.findOne(
      id, 
      { relations: ['mainCompany','users','documents','country','regAddressCountry'] },
    );
  }

  async updateCompanyStatus(id: number) {
    await this.companyRepository.update({ id }, { compstatus: () => '0' });
    return await this.companyRepository.findOne({ id });
  }
  
  async addPageToCompany(companyId: number, pageIds: number[]): Promise<void> {
    const company = await this.companyRepository.findOne(companyId, {
      relations: ['pages'],
    });
  
    const existingPages = company.pages.map((page) => page.id);
    const pagesToRemove = existingPages.filter((pageId) => !pageIds.includes(pageId));
    const pagesToAdd = pageIds.filter((pageId) => !existingPages.includes(pageId));
    
    if (pagesToRemove.length) {
      company.pages = company.pages.filter((page) => !pagesToRemove.includes(page.id));
      await this.companyRepository.save(company);
    }    
  
    if (pagesToAdd.length) {
      const pagesToAddEntities = await this.pagePermissionRepository.findByIds(
        pagesToAdd
      );
      company.pages.push(...pagesToAddEntities);
    }
  
    await this.companyRepository.save(company);
  }
  async testemail(){
    const password= "nuwan@gmail.com";
    const name= "nuwan";
    const toemail= "nuwanpriyamal@gmail.com";
    const username= "dfdfd";
    await this.mailservice.sendcompanyCreate(password,name,toemail,username);
  }
}