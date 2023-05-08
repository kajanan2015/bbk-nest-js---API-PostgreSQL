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
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(PagePermissionEntity)
    private pagePermissionRepository: Repository<PagePermissionEntity>,
    private readonly systemcodeService:SystemCodeService,
    private readonly userservice:UserService,
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
        relations: ['mainCompany']
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
          uType:"CADMIN",
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
      mainCompany:companyData.parentCompany
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
      users:users
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

  async read(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne(
      id, 
      { relations: ['mainCompany','users'] },
    );
  }

  async update(id: number, data: Partial<CompaniesDTO>) {
    await this.companyRepository.update({ id }, data);
    return await this.companyRepository.findOne({ id });
  }

  async updateCompanyStatus(id: number, companyStatus: string) {
    await this.companyRepository.update({ id }, { status: () => companyStatus });
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
  
}