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
import { ImageUploadService } from 'src/imageupload/imageupload.service';

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
    private readonly imageUploadService: ImageUploadService,
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User> 
  ) { }

  async showAll() {
    return await this.companyRepository.find(
      {
        where: { status: 1 , companyIdentifier: 'maincompany' },
        relations: ['mainCompany','users']
      }
    );
  }

  async showcompanylist(value){
    const companylist= await this.companyRepository.findOne({
      where:{
        id:value
      },  relations: ['mainCompany']
    })
    console.log(companylist,989898)
    return await this.companyRepository.find(
      {
        where:{
          mainCompany:companylist.mainCompany.id
        }
      }
    )
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
        where: { status: 1 ,compstatus:value },
        relations: ['mainCompany','users'],
        order:{
          mainCompany:'ASC'
        }
      }
    );
  }


  async showonlyActivesubCompany(value) {
    return await this.companyRepository.find(
      {
        where: { status: 1 , companyIdentifier:"subcompany",compstatus:value },
        relations: ['mainCompany','users']
      }
    );
  }

  async getcompanyType(){
    const query = 'SELECT * FROM `companyType`';
    const companyTypeList = await this.connection.query(query);
    return companyTypeList;
  }

  async getcountry(){
    const query = 'SELECT * FROM `country`';
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
  

  const existingcompanyname = await this.companyRepository.findOne({where:{companyName:companyData.companyName,registrationNumber:companyData.registrationNumber,country:companyData.country,regAddressCountry:companyData.regAddressCountry}});
     if (existingcompanyname) {
      return 'company name exist';
     }

  const response=await this.systemcodeService.findOne('company')
  const companyCode=response.code+''+response.startValue   
  const newstartvalue={
    startValue:response.startValue+1
  }
  let documentUpload=[];
  let profileImg, logoImg,profilethumbUrl,companythumbUrl=null;

  // Iterate over the array and assign values to variables
  for (const item of companyData.filename) {
    if (item.hasOwnProperty('profileImg')) {
      profileImg = item.profileImg[0];
      profilethumbUrl=await this.imageUploadService.uploadThumbnailToS3(item.profileImg[0]);
    }
    if (item.hasOwnProperty('logoImg')) {
      logoImg = item.logoImg[0];
      companythumbUrl=await this.imageUploadService.uploadThumbnailToS3(item.logoImg[0]);
    }
    if (item.hasOwnProperty('files[]')) {
      documentUpload = item['files[]'];
    }
  }

  const files = documentUpload.map(documentPath => ({ documentPath }));

  let dataCompany;
 //  let newCompany;
  if(companyData.parentCompany&&companyData.parentCompany!=""){
   const company = await this.companyRepository.findOne(companyData.parentCompany, {
     relations: ['users']
   });
   if (!company) {
     throw new NotFoundException(`Company with ID ${companyData.parentCompany} not found`);
   }
   const userIds = company.users.map(user => user.id);

   if(companyData.sameParentCompanyAdmin=="false"){
     
     const existing = await this.userservice.findByEmail(companyData.email);
     if (existing) {
      return "account exist";
     }
    
     const userData={
         firstName:companyData.firstName,
         lastName:companyData.lastName,
         uType:"SADMIN",
         profilePic:profileImg,
         profilePicThumb:profilethumbUrl,
         password:companyData.password,
         phone:companyData.phone,
         email:companyData.email,
     }
      const userResponse= await this.userservice.create(userData);
      await this.mailservice.sendcompanyCreate(companyData.password,companyData.firstName,companyData.companyEmail,companyData.email);
      const useraccount = userResponse.id.toString();   
      userIds.push(useraccount);
   }else{
     await this.mailservice.sendcompanyCreate("",companyData.companyName,companyData.companyEmail,"");
   }
   const users = await this.userRepository.findByIds(userIds);
   dataCompany={
     ...companyData,
     companyLogo:logoImg,
     companyLogoThumb:companythumbUrl,
     companyCode:companyCode,
     users:users,
     mainCompany:companyData.parentCompany,
     documents:files,
     companyIdentifier:"subcompany"
  }
   

  }else{
   const existing = await this.userservice.findByEmail(companyData.email);
   if (existing) {
     return "account exist";
   }
   const userData={
    firstName:companyData.firstName,
    lastName:companyData.lastName,
    uType:"CADMIN",
    profilePic:profileImg,
    profilePicThumb:profilethumbUrl,
    password:companyData.password,
    phone:companyData.phone,
    email:companyData.email,
   }
    const userResponse= await this.userservice.create(userData);
    await this.mailservice.sendcompanyCreate(companyData.password,companyData.firstName,companyData.companyEmail,companyData.email);
    const userIds = userResponse.id.toString();   
    const users = await this.userRepository.findByIds(userIds);
 
    dataCompany={
     ...companyData,
     companyLogo:logoImg,
     companyLogoThumb:companythumbUrl,
     companyCode:companyCode,
     users:users,
     documents:files,
     companyIdentifier:"maincompany"
  }
   
   }
  console.log(dataCompany,56565656)
   await this.systemcodeService.update(response.id,newstartvalue)
  const newCompany = await this.companyRepository.create(dataCompany);

   const responsesave= await this.companyRepository.save(newCompany);
   if(dataCompany.companyIdentifier=='maincompany'){
   const query = `
   UPDATE company
   SET parentCompanyId = '${responsesave['id']}'
   WHERE id = '${responsesave['id']}'
 `;
   const hi=  await this.connection.query(query);
   }
   
   // const id=responsesave[0].id
   
   // await this.companyRepository.update({ id}, { mainCompany: () => newCompany[0].id.toString() });
   return responsesave;

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
      { relations: ['mainCompany','users','documents','country','regAddressCountry','companyType'] },
    );
  }

  async update(id: number, data) {

  //  console.log(data.users[0].firstName,9990009)

   console.log(data,56565656565656)
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

   if(data.deletedDocument){
    let deletedocuments=[];
    for (const documentUrl of data.deletedDocument) {
      deletedocuments = await this.companyDocumentRepository.find({ 
        where: { documentPath: documentUrl}, 
      }); 
      console.log(documentUrl,89898989898)
      await this.imageUploadService.deletedoc(documentUrl)
    }
    await this.companyDocumentRepository.remove(deletedocuments)
   }
   if(data.filename&&data.filename.length>0){
    let documentUpload=[];
    let profileImg, logoImg,profilethumbUrl,companythumbUrl=null;
    for (const item of data.filename) {
      if (item.hasOwnProperty('profileImg')) {
        profileImg = item.profileImg[0];
        profilethumbUrl=await this.imageUploadService.uploadThumbnailToS3(item.profileImg[0]);
        const dataprofilpic={
          profilePic: profileImg, 
          profilePicThumb:profilethumbUrl
        }
        await this.userservice.update(data.userId,dataprofilpic);
      }
      if (item.hasOwnProperty('logoImg')) {
        logoImg = item.logoImg[0];
        companythumbUrl=await this.imageUploadService.uploadThumbnailToS3(item.logoImg[0]);
        const datalogo={
          companyLogo: logoImg, 
          companyLogoThumb:companythumbUrl,
        }
         await this.companyRepository.update({ id },datalogo);
      }
      if (item.hasOwnProperty('files[]')) {
        documentUpload = item['files[]'];
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
      ...(data.users[0].password ? { password: data.users[0].password} : {}),
     }
     
     const userResponse= await this.userservice.update(data.userId,passuserData);

     if(data.existingCompanyEmail){
      if(data.users[0].password && data.users[0].email ){
        await this.mailservice.sendcompanyCreate(data.users[0].password,"user",data.existingCompanyEmail,data.users[0].email);
      }
      else if(data.users[0].email){
        await this.mailservice.sendcompanyCreate("password is not change","user",data.existingCompanyEmail,data.users[0].email);
      }else if(data.users[0].password){
        await this.mailservice.sendcompanyCreate(data.users[0].password,"user",data.existingCompanyEmail,"your username is not change");
      }else{
        await this.mailservice.sendcompanyCreate("password is not change. But user profile details are change","user",data.existingCompanyEmail,"your username is not change");
      }
      
    }
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

  async updateCompanyStatus(id: number,status) {
    console.log(status,888)
    await this.companyRepository.update({ id }, { compstatus: () => status });
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