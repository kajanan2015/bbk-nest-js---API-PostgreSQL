import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
  SelectQueryBuilder,
  getConnection,
} from "typeorm";
import { CompaniesDTO } from "./companies.dto";
import { CompaniesEntity } from "./companies.entity";
import { CompaniesEntityinfo } from './companies.entity';
import { CompaniesHistorydata } from './companies.entity';


import { PagePermissionEntity } from "src/pagepermission/pagepermission.entity";
import { SystemCodeService } from "src/system-code/system-code.service";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { Connection, QueryRunner } from "typeorm";
import { MailService } from "src/mail/mail.service";
import { CompanyDocument } from "src/company-document/company-document.entity";
import { CompanyDocumentService } from "src/company-document/company-document.service";
import { ImageUploadService } from "src/imageupload/imageupload.service";
import { CreatemoduleService } from "src/createmodule/createmodule.service";
import { Createmodule } from "src/createmodule/createmodule.entity";
import { Createpackage } from "src/createpackage/createpackage.entity";
import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";
import * as dotenv from 'dotenv';
import { CompanypackagerowService } from "src/companypackagerow/companypackagerow.service";
const randomstring = require("randomstring");
import { Companypackagerow } from "src/companypackagerow/companypackagerow.entity";
import { EmployeeDataHistory } from "src/employee-data-history/employee-data-history.entity";
import { EmployeeDataHistoryService } from "src/employee-data-history/employee-data-history.service";
import { country } from "./country/country.entity";
import { companytype } from "./company Type/companytype.entity";

import { Deactivationmethod } from "./companies.entity";
import { Companystatus } from "./companies.entity";
import { Companyidentifier } from "./companies.entity";
import { Historydatatype } from "./companies.entity";
@Injectable()
export class CompaniesService {

  deactivationmethodvalue = Deactivationmethod.IMMEDIATE;
  companystatusvalue = Companystatus.DEACTIVATE;
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(CompaniesEntityinfo)
    private companyinfoRepository: Repository<CompaniesEntityinfo>,
    @InjectRepository(CompaniesHistorydata)
    private companyhistoryRepository: Repository<CompaniesHistorydata>,


    @InjectRepository(PagePermissionEntity)
    private pagePermissionRepository: Repository<PagePermissionEntity>,
    @InjectRepository(CompanyDocument)
    private companyDocumentRepository: Repository<CompanyDocument>,
    private readonly systemcodeService: SystemCodeService,
    private readonly userservice: UserService,
    private readonly companydocumentservice: CompanyDocumentService,
    private readonly mailservice: MailService,
    private readonly imageUploadService: ImageUploadService,
    private readonly connection: Connection,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Createmodule)
    private readonly modulerepository: Repository<Createmodule>,
    @InjectRepository(Createpackage)
    private readonly pkgrepository: Repository<Createpackage>,
    @InjectRepository(Moduledetailsofpackage)
    private readonly detailsrepository: Repository<Moduledetailsofpackage>,
    private readonly companyrowpackageservice: CompanypackagerowService,
    @InjectRepository(Companypackagerow)
    private readonly companypackagerowrepository: Repository<Companypackagerow>,
    private readonly datahistoryservice: EmployeeDataHistoryService,
    @InjectRepository(EmployeeDataHistory)
    private readonly datahistoryrepo: Repository<EmployeeDataHistory>,
    @InjectRepository(country)
    private readonly countryrepo: Repository<country>,
    @InjectRepository(companytype)
    private readonly companytyperepo: Repository<companytype>,
  ) { }


  async create(companyData, base_url) {
    const existingcompanyname = await this.companyinfoRepository.findOne({
      where: {
        companyName: companyData.companyName,
        registrationNumber: companyData.registrationNumber,
        country: companyData.country,
        regAddressCountry: companyData.regAddressCountry,
      },
    });
    if (existingcompanyname) {
      return "company name exist";
    }


    const response = await this.systemcodeService.findOne("company");
    const companyCode = response.code + "" + response.startValue;
    const newstartvalue = {
      startValue: response.startValue + 1,
    };

    let profilethumbUrl,
      companythumbUrl = null;

    companythumbUrl = companyData.logoImg
      ? await this.imageUploadService.uploadThumbnailToS3(companyData.logoImg)
      : null;


    let files = null;

    if (companyData.file) {
      files = [];
      var documentPaths = companyData.file;
      for (var i = 0; i < documentPaths.length; i++) {
        var documentPath = documentPaths[i];
        files.push({ documentPath: documentPath });
      }
    }
    let dataCompany;
    let mainDataCompany;
    if (companyData.parentCompany && companyData.parentCompany != "") {
      const users = [];
      const company = await this.companyRepository.findOne(
        companyData.parentCompany, {
        relations: ["linkedcompany", "users"],
      }
      );
      if (!company) {
        throw new NotFoundException(
          `Company with ID ${companyData.parentCompany} not found`
        );
      }
      const userIds = [];
      if (companyData.sameParentCompanyAdmin == "false") {


        const companyusers = company.users;
        for (var i = 0; i < companyusers.length; i++) {
          var user = companyusers[i];
          userIds.push(user.id);
        }

        // console.log(userIds, 78787878)

        const adminUsers = companyData.admins;
        // console.log(adminUsers, 7890);
        let existing;
        let adminData;
        let adminResponse;
        let adminUser;
        let userId;
        adminUser = await this.userRepository.findByIds(userIds);
        for (var i = 0; i < adminUser.length; i++) {
          users.push(adminUser[i]);
          await this.mailservice.shareaccesstochildcompany(adminUser[i].email, companyData.companyName, adminUser[i].firstName, company.linkedcompany[0].companyName);
        }
        for (const admin of adminUsers) {
          existing = await this.userservice.findByEmailexist(admin.email);
          if (existing) {
            return "account exist";
          }
          profilethumbUrl = admin.profileImage
            ? await this.imageUploadService.uploadThumbnailToS3(
              admin.profileImage
            )
            : null;
          adminData = {
            firstName: admin.firstName,
            lastName: admin.lastName,
            uType: "SADMIN",
            profilePic: admin.profileImage,
            profilePicThumb: profilethumbUrl,
            password: admin.password,
            phone: admin.phone,
            email: admin.email,
          };
          adminResponse = await this.userservice.create(adminData);
          await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password, base_url);
          // userIds.push(adminResponse.id.toString());
          const userId = adminResponse.id.toString();
          // userIds.push(adminResponse.id.toString());
          const adminUser = await this.userRepository.findByIds(userId);
          users.push(adminUser[0]);
          // userId = adminResponse.id.toString();
        }
      } else {

        if (companyData.parentCompanyAdmin) {
          for (const value of companyData.parentCompanyAdmin) {
            userIds.push(value);
          }
          let adminUser;
          adminUser = await this.userRepository.findByIds(userIds);
          for (var i = 0; i < adminUser.length; i++) {
            users.push(adminUser[i]);
            await this.mailservice.shareaccesstochildcompany(adminUser[i].email, companyData.companyName, adminUser[i].firstName, company.linkedcompany[0].companyName);
          }

          // console.log(users, 999)
        }
        if (
          companyData.firstName != "" &&
          companyData.lastName != "" &&
          companyData.uType != "" &&
          companyData.profilePic != "" &&
          companyData.profilePicThumb != "" &&
          companyData.password != "" &&
          companyData.phone != "" &&
          companyData.email != ""
        ) {
          const adminUsers = companyData.admins;
          for (const admin of adminUsers) {
            const existing = await this.userservice.findByEmailexist(admin.email);
            if (existing) {
              return "account exist";
            }
            profilethumbUrl = admin.profileImage
              ? await this.imageUploadService.uploadThumbnailToS3(
                admin.profileImage
              )
              : null;
            const adminData = {
              firstName: admin.firstName,
              lastName: admin.lastName,
              uType: "SADMIN",
              profilePic: admin.profileImage,
              profilePicThumb: profilethumbUrl,
              password: admin.password,
              phone: admin.phone,
              email: admin.email,
            };

            const adminResponse = await this.userservice.create(adminData);
            await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password, base_url);


            const userId = adminResponse.id.toString();
            // userIds.push(adminResponse.id.toString());
            const adminUser = await this.userRepository.findByIds(userId);
            users.push(adminUser[0]);
            // adminUser = await this.userRepository.findByIds([userId]);
            // users.push(adminUser[0]);
          }
        } else {
          // await this.mailservice.sendcompanyCreate("", companyData.companyName, companyData.companyEmail, "");
        }
      }
      // const users = await this.userRepository.findByIds(userIds);
      if (!companyData.sameTradingAddress) {

        mainDataCompany = {
          company_code: companyCode,
          company_prefix: companyData.code,
          documents: files,
          users: users,
        }
        dataCompany = {
          ...companyData,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          mainCompany: companyData.parentCompany,
          companyIdentifier: Companyidentifier.SUB
        }
      } else {

        mainDataCompany = {
          company_code: companyCode,
          company_prefix: companyData.code,
          documents: files,
          users: users,
        }

        dataCompany = {
          ...companyData,
          regAddressNo: companyData.number,
          regAddressStreet: companyData.street,
          regAddressCity: companyData.city,
          regAddressPostalCode: companyData.postalCode,
          regAddressCountry: companyData.country,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          mainCompany: companyData.parentCompany,
          companyIdentifier: Companyidentifier.SUB
        }
      }
    } else {
      const adminUsers = companyData.admins;
      const users = [];
      for (const admin of adminUsers) {
        const existing = await this.userservice.findByEmailexist(admin.email);
        if (existing) {
          return "account exist";
        }
        profilethumbUrl = admin.profileImage
          ? await this.imageUploadService.uploadThumbnailToS3(
            admin.profileImage
          )
          : null;
        const adminData = {
          firstName: admin.firstName,
          lastName: admin.lastName,
          uType: "CADMIN",
          profilePic: admin.profileImage,
          profilePicThumb: profilethumbUrl,
          password: admin.password,
          phone: admin.phone,
          email: admin.email,
        };

        const adminResponse = await this.userservice.create(adminData);

        await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password, base_url);
        const userId = adminResponse.id.toString();
        const adminUser = await this.userRepository.findByIds([userId]);
        users.push(adminUser[0]);
      }
      if (!companyData.sameTradingAddress) {
        mainDataCompany = {
          company_code: companyCode,
          company_prefix: companyData.code,
          documents: files,
          users: users,
        }
        dataCompany = {
          ...companyData,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyIdentifier: Companyidentifier.MAIN,
        };
      } else {

        mainDataCompany = {
          company_code: companyCode,
          company_prefix: companyData.code,
          documents: files,
          users: users,
        }

        dataCompany = {
          ...companyData,
          regAddressNo: companyData.number,
          regAddressStreet: companyData.street,
          regAddressCity: companyData.city,
          regAddressPostalCode: companyData.postalCode,
          regAddressCountry: companyData.country,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyIdentifier: Companyidentifier.MAIN,
        };
      }
    }

    await this.systemcodeService.update(response.id, newstartvalue);
    const trialpackagedata = await this.pkgrepository.findOne({ where: { packagename: "Trial", validity: 0, enddate: null }, relations: ['packagedetails', 'packagedetails.packages', 'packagedetails.module'] })
    dataCompany.package = trialpackagedata.packagedetails;
    dataCompany.contractagreement = 0;
    const currentDateTime = new Date();
    const validtimeTime = new Date();
    validtimeTime.setDate(validtimeTime.getDate() + parseInt(trialpackagedata.numberOfDays));
    validtimeTime.setMilliseconds(0);
    // dataCompany.validityperiod = validtimeTime;
    // dataCompany.validityperiod=new Date(validtimeTime.split('.')[0]);
    const maintableinsert = await this.companyRepository.create(mainDataCompany)
    const maintableinsertsave = await this.companyRepository.save(maintableinsert)
    dataCompany.company = maintableinsertsave["id"];
    const newCompany = await this.companyinfoRepository.create(dataCompany);
    const responsesave = await this.companyinfoRepository.save(newCompany);

    const historydate={
      history_data_type:Historydatatype.COMPANY,
      history_data:dataCompany,
      created_at:dataCompany.created_at,
      created_by:dataCompany.created_by,
      updated_at:dataCompany.updated_at?dataCompany.updated_at:null,
      updated_by:dataCompany.updated_by?dataCompany.updated_by:null,
      companyinfo:responsesave["id"],
      company:maintableinsertsave["id"],
      start_date:dataCompany.start_date
    }
    const addhistory=await this.companyhistoryRepository.create(historydate)
    const savehistory=await this.companyhistoryRepository.save(addhistory)




    // const jsonData = JSON.stringify({
    //   bn: "company",
    //   responsesaveId: responsesave["id"]
    // });
    

    // const responsehistory = await this.companyhistoryRepository.create({ history_data_type: "company-history", history_data: dataCompany, company: responsesave["id"] });
    // const res = await this.datahistoryrepo.save(responsehistory);





    let newcompassigndata;

    const newlycreatedcompany = responsesave["id"];
    await this.companypackagerowrepository
      .createQueryBuilder()
      .update(Companypackagerow)
      .set({ enddate: currentDateTime })
      .where('companyId = :newlycreatedcompany', { newlycreatedcompany })
      .execute();
    for (const trialpackagerowvalue of trialpackagedata.packagedetails) {
      console.log(trialpackagerowvalue, 5665566324324)
      newcompassigndata = {
        rowcount: trialpackagerowvalue.NoOfRecords,
        availablerowcount: trialpackagerowvalue.NoOfRecords,
        rowprice: trialpackagerowvalue.CostPerRecord,
        packageprice: trialpackagerowvalue.PackagePrice,
        module: trialpackagerowvalue.module.id,
        packages: trialpackagerowvalue.packages.id,
        moduledetails: trialpackagerowvalue.id,
        company: parseInt(responsesave["id"]),
        trialpackageidentifier: '1'
      }
      console.log(newcompassigndata, 5236565)
      const compackageresponse = await this.companypackagerowrepository.create(newcompassigndata)
      const comppackagerowadded = await this.companypackagerowrepository.save(compackageresponse)
    }



    console.log(dataCompany, 453)
    console.log(newCompany, 43534)
    // await this.mailservice.companycreationsuccess(dataCompany.companyEmail, "adminemail", "adminname", dataCompany.companyName, process.env.main_url);
    if (dataCompany.companyIdentifier == Companyidentifier.MAIN) {
      const query = `
   UPDATE company_info
   SET parent_company_id = '${maintableinsertsave["id"]}'
   WHERE company_info_id = '${responsesave["id"]}'
 `;
      const hi = await this.connection.query(query);
    }

    // const id=responsesave[0].id
    //await this.mailservice.sendcompanyCreateNew(companyData.email, companyData.companyName);
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













  // async showAll() {
  //   return await this.companyRepository.find({
  //     where: { linkedcompany:{
  //       companyIdentifier:"main"}},
  //     relations: [
  //       "users",
  //       "documents",
  //       "linkedcompany",
  //       "linkedcompany.mainCompany",
  //       "linkedcompany.mainCompany.users",
  //       "linkedcompany.country",
  //       "linkedcompany.regAddressCountry",
  //       "linkedcompany.companyType",
  //       "linkedcompany.billing",
  //     ],

  //   });
  // }


  async showAll() {
    const date = new Date();
    const query: SelectQueryBuilder<CompaniesEntity> = getConnection()
      .getRepository(CompaniesEntity)
      .createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "users")
      .leftJoinAndSelect("company.documents", "documents")
      .leftJoinAndSelect("company.linkedcompany", "linkedcompany")
      .leftJoinAndSelect("linkedcompany.mainCompany", "mainCompany")
      .leftJoinAndSelect("linkedcompany.country", "country")
      .leftJoinAndSelect("linkedcompany.regAddressCountry", "regAddressCountry")
      .leftJoinAndSelect("linkedcompany.companyType", "companyType")
      .leftJoinAndSelect("linkedcompany.billing", "billing")
      .where("linkedcompany.companyIdentifier = :identifier", { identifier: "main" })
      .andWhere("linkedcompany.start_date < :date", { date })
      .andWhere(
        "linkedcompany.end_date IS NULL OR linkedcompany.end_date > :date",
        { date }
      );

    const data = await query.getMany();
    let passdata;
    console.log(data, 456789)
    const newdata = [];
    let companystatusvalue;
    let companyIdentifier;
    for (var i = 0; i < data.length; i++) {
      companyIdentifier = data[i].linkedcompany[0].companyIdentifier == "main" ? "maincompany" : "subcompany"
      if (data[i].linkedcompany[0].company_status == 'trial') {
        console.log(data[i].linkedcompany[0].company_status, 8898)
        companystatusvalue = 0
      } else if (data[i].linkedcompany[0].company_status == 'active') {
        companystatusvalue = 1
      } else {
        companystatusvalue = 2
      }

      passdata = {
        id: data[i].id,
        companyName: data[i].linkedcompany[0].companyName,
        companyEmail: data[i].linkedcompany[0].companyEmail,
        companyPhone: data[i].linkedcompany[0].companyPhone,
        website: data[i].linkedcompany[0].website,
        number: data[i].linkedcompany[0].number,
        street: data[i].linkedcompany[0].street,
        city: data[i].linkedcompany[0].city,
        postalCode: data[i].linkedcompany[0].postalCode,
        vat: data[i].linkedcompany[0].vat,
        registrationNumber: data[0].linkedcompany[0].registrationNumber,
        regAddressNo: data[i].linkedcompany[0].regAddressNo,
        regAddressStreet: data[i].linkedcompany[0].regAddressStreet,
        regAddressCity: data[i].linkedcompany[0].regAddressCity,
        regAddressPostalCode: data[i].linkedcompany[0].regAddressPostalCode,
        companyLogo: data[i].linkedcompany[0].companyLogo,
        companyLogoThumb: data[i].linkedcompany[0].companyLogoThumb,
        companyCode: data[i].company_code,
        createdBy: data[i].created_by,
        createdat: data[i].created_at,
        updatedat: data[i].linkedcompany[0].updated_at,
        updatedBy: data[i].linkedcompany[0].updated_by,
        companyIdentifier: companyIdentifier,
        code: data[i].company_prefix,
        mainCompany: data[i].linkedcompany[0].mainCompany,
        users: data[i].users,
        documents: data[i].documents,
        country: data[i].linkedcompany[0].country,
        regAddressCountry: data[i].linkedcompany[0].regAddressCountry,
        companyType: data[i].linkedcompany[0].companyType,
        billing: data[i].linkedcompany[0].billing,
        compstatus: companystatusvalue

      }

      newdata.push(passdata)
    }
    return newdata;
  }


  async showcompanylist(value) {
    const companylist = await this.companyRepository.findOne({
      where: {
        id: value,
      },
      relations: ["linkedcompany", "linkedcompany.mainCompany"],
    });
    return await this.companyinfoRepository.find({
      where: {
        mainCompany: companylist.linkedcompany[0].mainCompany.id,
      },
      relations: ["mainCompany"]
    });
  }

  async showonlySubCompany() {
    return await this.companyRepository.find({
      where: { mainCompany: Not(IsNull()) },
      relations: [
        "linkedcompany.mainCompany",
        "linkedcompany.mainCompany.users",
        "users",
        "documents",
        "linkedcompany.country",
        "linkedcompany.regAddressCountry",
        "linkedcompany.companyType",
        "linkedcompany.billing",
      ],

    });
  }

  async showonlyActivemainCompany(value) {
    const date = new Date();
    let statusvalue;
    if (value == 0) {
      statusvalue = 'trial'
    } else if (value == 1) {
      statusvalue = 'active'
    } else {
      statusvalue = 'deactivate'
    }

    const query: SelectQueryBuilder<CompaniesEntity> = getConnection()
      .getRepository(CompaniesEntity)
      .createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "users")
      .leftJoinAndSelect("company.documents", "documents")
      .leftJoinAndSelect("company.linkedcompany", "linkedcompany")
      .leftJoinAndSelect("linkedcompany.mainCompany", "mainCompany")
      .leftJoinAndSelect("linkedcompany.country", "country")
      .leftJoinAndSelect("linkedcompany.regAddressCountry", "regAddressCountry")
      .leftJoinAndSelect("linkedcompany.companyType", "companyType")
      .leftJoinAndSelect("linkedcompany.billing", "billing")
      .where("linkedcompany.company_status = :status", { status: statusvalue })
      .andWhere("linkedcompany.start_date < :date", { date })
      .andWhere(
        "linkedcompany.end_date IS NULL OR linkedcompany.end_date > :date",
        { date }
      )
      .orderBy("linkedcompany.mainCompany", "ASC");

    const data = await query.getMany();

    let passdata;
    const newdata = [];
    let companystatusvalue;
    let companyIdentifier;
    for (var i = 0; i < data.length; i++) {
      companyIdentifier = data[i].linkedcompany[0].companyIdentifier == "main" ? "maincompany" : "subcompany"
      if (data[i].linkedcompany[0].company_status == 'trial') {
        companystatusvalue = 0
      } else if (data[i].linkedcompany[0].company_status == 'active') {
        companystatusvalue = 1
      } else {
        companystatusvalue = 2
      }

      passdata = {
        id: data[i].id,
        companyName: data[i].linkedcompany[0].companyName,
        companyEmail: data[i].linkedcompany[0].companyEmail,
        companyPhone: data[i].linkedcompany[0].companyPhone,
        website: data[i].linkedcompany[0].website,
        number: data[i].linkedcompany[0].number,
        street: data[i].linkedcompany[0].street,
        city: data[i].linkedcompany[0].city,
        postalCode: data[i].linkedcompany[0].postalCode,
        vat: data[i].linkedcompany[0].vat,
        registrationNumber: data[0].linkedcompany[0].registrationNumber,
        regAddressNo: data[i].linkedcompany[0].regAddressNo,
        regAddressStreet: data[i].linkedcompany[0].regAddressStreet,
        regAddressCity: data[i].linkedcompany[0].regAddressCity,
        regAddressPostalCode: data[i].linkedcompany[0].regAddressPostalCode,
        companyLogo: data[i].linkedcompany[0].companyLogo,
        companyLogoThumb: data[i].linkedcompany[0].companyLogoThumb,
        companyCode: data[i].company_code,
        createdBy: data[i].created_by,
        createdat: data[i].created_at,
        updatedat: data[i].linkedcompany[0].updated_at,
        updatedBy: data[i].linkedcompany[0].updated_by,
        companyIdentifier: companyIdentifier,
        code: data[i].company_prefix,
        mainCompany: data[i].linkedcompany[0].mainCompany,
        users: data[i].users,
        documents: data[i].documents,
        country: data[i].linkedcompany[0].country,
        regAddressCountry: data[i].linkedcompany[0].regAddressCountry,
        companyType: data[i].linkedcompany[0].companyType,
        billing: data[i].linkedcompany[0].billing,
        compstatus: companystatusvalue

      }

      newdata.push(passdata)
    }
    return newdata;
  }

  async showonlyActivesubCompany(value) {
    // return await this.companyRepository.find({
    //   where: { status: 1, companyIdentifier: "subcompany", compstatus: value },
    //   // relations: [
    //   //   "users",
    //   //   "documents",
    //   //   "linkedcompany",
    //   //   "linkedcompany.mainCompany",
    //   //   "linkedcompany.mainCompany.users",
    //   //   "linkedcompany.country",
    //   //   "linkedcompany.regAddressCountry",
    //   //   "linkedcompany.companyType",
    //   //   "linkedcompany.billing",
    //   // ],
    // });
    const date = new Date();
    let statusvalue;
    if (value == 0) {
      statusvalue = 'trial'
    } else if (value == 1) {
      statusvalue = 'active'
    } else {
      statusvalue = 'deactivate'
    }
    console.log(statusvalue, 88888989)
    const query: SelectQueryBuilder<CompaniesEntity> = getConnection()
      .getRepository(CompaniesEntity)
      .createQueryBuilder("company")
      .leftJoinAndSelect("company.users", "users")
      .leftJoinAndSelect("company.documents", "documents")
      .leftJoinAndSelect("company.linkedcompany", "linkedcompany")
      .leftJoinAndSelect("linkedcompany.mainCompany", "mainCompany")
      .leftJoinAndSelect("linkedcompany.country", "country")
      .leftJoinAndSelect("linkedcompany.regAddressCountry", "regAddressCountry")
      .leftJoinAndSelect("linkedcompany.companyType", "companyType")
      .leftJoinAndSelect("linkedcompany.billing", "billing")
      .where("linkedcompany.company_status = :status", { status: statusvalue })
      .andWhere("linkedcompany.companyIdentifier = :identifier", { identifier: "sub" })
      .andWhere("linkedcompany.start_date < :date", { date })
      .andWhere(
        "linkedcompany.end_date IS NULL OR linkedcompany.end_date > :date",
        { date }
      );;
    const data = await query.getMany();
    let passdata;
    console.log(data, 456789)
    const newdata = [];
    let companystatusvalue;
    let companyIdentifier;
    for (var i = 0; i < data.length; i++) {
      companyIdentifier = data[i].linkedcompany[0].companyIdentifier == "main" ? "maincompany" : "subcompany"
      if (data[i].linkedcompany[0].company_status == 'trial') {
        companystatusvalue = 0
      } else if (data[i].linkedcompany[0].company_status == 'active') {
        companystatusvalue = 1
      } else {
        companystatusvalue = 2
      }
      passdata = {
        id: data[i].id,
        companyName: data[i].linkedcompany[0].companyName,
        companyEmail: data[i].linkedcompany[0].companyEmail,
        companyPhone: data[i].linkedcompany[0].companyPhone,
        website: data[i].linkedcompany[0].website,
        number: data[i].linkedcompany[0].number,
        street: data[i].linkedcompany[0].street,
        city: data[i].linkedcompany[0].city,
        postalCode: data[i].linkedcompany[0].postalCode,
        vat: data[i].linkedcompany[0].vat,
        registrationNumber: data[0].linkedcompany[0].registrationNumber,
        regAddressNo: data[i].linkedcompany[0].regAddressNo,
        regAddressStreet: data[i].linkedcompany[0].regAddressStreet,
        regAddressCity: data[i].linkedcompany[0].regAddressCity,
        regAddressPostalCode: data[i].linkedcompany[0].regAddressPostalCode,
        companyLogo: data[i].linkedcompany[0].companyLogo,
        companyLogoThumb: data[i].linkedcompany[0].companyLogoThumb,
        companyCode: data[i].company_code,
        createdBy: data[i].created_by,
        createdat: data[i].created_at,
        updatedat: data[i].linkedcompany[0].updated_at,
        updatedBy: data[i].linkedcompany[0].updated_by,
        companyIdentifier: companyIdentifier,
        code: data[i].company_prefix,
        mainCompany: data[i].linkedcompany[0].mainCompany,
        users: data[i].users,
        documents: data[i].documents,
        country: data[i].linkedcompany[0].country,
        regAddressCountry: data[i].linkedcompany[0].regAddressCountry,
        companyType: data[i].linkedcompany[0].companyType,
        billing: data[i].linkedcompany[0].billing,
        compstatus: companystatusvalue

      }

      newdata.push(passdata)
    }
    return newdata;



  }
  async getcompanyType() {
    const companyTypeList = await this.companytyperepo.find();
    // const companyTypeList = await this.connection.query(query);
    return companyTypeList;
  }

  async getcountry() {
    const countryList = await this.countryrepo.find();
    return countryList;
  }

  async showSubAll(mainCompanyId: number): Promise<CompaniesEntity[]> {
    return await this.companyRepository.find({
      where: {
        status: 1,
        mainCompany: {
          id: mainCompanyId,
        },
      },
      relations: [
        "mainCompany",
        "mainCompany.users",
        "users",
        "documents",
        "country",
        "regAddressCountry",
        "companyType",
        "billing",
      ],
    });
  }


  async findById(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne({ id });
  }

  async getmatchsubcompany(id: number) {
    return await this.companyRepository.find({
      where: { status: 1, mainCompany: id },
      // relations: ['mainCompany','users']
    });
  }

  async read(id: number) {
    return await this.companyRepository.findOne(id, {
      // relations: [
      //   "users",
      //   "documents",
      //   "linkedcompany",
      //   "linkedcompany.mainCompany",
      //   "linkedcompany.mainCompany.users",
      //   "linkedcompany.country",
      //   "linkedcompany.regAddressCountry",
      //   "linkedcompany.companyType",
      //   "linkedcompany.billing",
      // ],
    });
  }

  async update(id: number, data) {
    console.log(data, 11111111111);
    let passcompanyData;
    passcompanyData = {
      ...(data.companyName ? { companyName: data.companyName } : {}),
      ...(data.companyEmail ? { companyEmail: data.companyEmail } : {}),
      ...(data.website ? { website: data.website } : {}),
      ...(data.companyPhone ? { companyPhone: data.companyPhone } : {}),
      ...(data.number ? { number: data.number } : {}),
      ...(data.street ? { street: data.street } : {}),
      ...(data.city ? { city: data.city } : {}),
      ...(data.postalCode ? { postalCode: data.postalCode } : {}),
      ...(data.vat ? { vat: data.vat } : {}),
      ...(data.code ? { code: data.code } : {}),
      ...(data.registrationNumber
        ? { registrationNumber: data.registrationNumber }
        : {}),
      ...(data.country ? { country: data.country.id } : {}),
      ...(data.companyType ? { companyType: data.companyType } : {}),
      ...(data.sameTradingAddress !== false
        ? {
          regAddressNo: data.regAddressNo,
          regAddressStreet: data.regAddressStreet,
          regAddressCity: data.regAddressCity,
          regAddressPostalCode: data.regAddressPostalCode,
          regAddressCountry: data.regAddressCountry.id,
        }
        : {}),
    };
    console.log(passcompanyData, 4567890);
    let untickid = [];
    let tickedid = [];
    if (data.untikId) {
      untickid = data.untikId;
    }
    if (data.parentCompanyAdmin) {
      tickedid = data.parentCompanyAdmin;
    }
    const companyfind = await this.companyRepository.findOne(id, {
      relations: ["users"],
    });

    if (companyfind) {
      const addedUserEntities = await this.userRepository.findByIds(tickedid);
      const removedUserEntities = await this.userRepository.findByIds(untickid);
      const newArray = [...companyfind.users, ...addedUserEntities];
      companyfind.users = newArray.filter(
        (user) =>
          !removedUserEntities.some((removedUser) => removedUser.id === user.id)
      );
      const r1 = await this.companyRepository.save(companyfind);

      // Find the previous record of the employee
      const previousRecord = await this.datahistoryrepo.findOne({
        where: {
          company: +id,
          type: "company-history"
        },
        order: { createdBy: 'DESC' },
      });

      // If a previous record exists, update its endDate
      // if (previousRecord) {
      //   previousRecord.endDate = new Date(Date.now());
      //   await this.datahistoryrepo.save(previousRecord);
      // }
      const historyresponse = {
        users: companyfind.users
      }
      const responsehistory = await this.datahistoryrepo.create({ type: "company-history", data: JSON.stringify(historyresponse), company: { id } });
      const res = await this.datahistoryrepo.save(responsehistory);





    }

    if (data.deletedDocument) {
      let deletedocuments = [];
      console.log(deletedocuments, 56789);
      for (const documentUrl of data.deletedDocument) {
        console.log(documentUrl, 6666);
        deletedocuments = await this.companyDocumentRepository.find({
          where: { documentPath: documentUrl.documentPath },
        });
        console.log(deletedocuments, 4567);
        console.log(deletedocuments, 4569);
        await this.imageUploadService.deletedoc(documentUrl.documentPath);
        await this.companyDocumentRepository.remove(deletedocuments);
      }
      console.log(deletedocuments, 56789);
    }
    if (data.filename && data.filename.length > 0) {
      let documentUpload = [];
      let profileImg,
        logoImg,
        profilethumbUrl,
        companythumbUrl = null;
      for (const item of data.filename) {
        // if (item.hasOwnProperty('profileImg')) {
        //   profileImg = item.profileImg[0];
        //   profilethumbUrl = await this.imageUploadService.uploadThumbnailToS3(item.profileImg[0]);
        //   const dataprofilpic = {
        //     profilePic: profileImg,
        //     profilePicThumb: profilethumbUrl
        //   }
        //   await this.userservice.update(data.userId, dataprofilpic);
        // }
        if (item.hasOwnProperty("logoImg")) {
          logoImg = item.logoImg[0];
          companythumbUrl = await this.imageUploadService.uploadThumbnailToS3(
            item.logoImg[0]
          );
          const datalogo = {
            companyLogo: logoImg,
            companyLogoThumb: companythumbUrl,
          };
          await this.companyinfoRepository.update({ id }, datalogo);
        }
        if (item.hasOwnProperty("files[]")) {
          documentUpload = item["files[]"];
          const files = documentUpload.map((documentPath) => ({
            documentPath,
            company: id,
          }));
          await this.companydocumentservice.create(files);
        }
      }
    }

    if (data.users) {
      let profilethumbUrl;
      let profilePic;
      for (const user of data.users) {
        if (user.profileImage) {
          if (user.profileImage == "deleted") {
            profilethumbUrl = null;
            profilePic = null;
          } else {
            profilethumbUrl = user.profileImage
              ? await this.imageUploadService.uploadThumbnailToS3(
                user.profileImage
              )
              : null;
            profilePic = user.profileImage;
          }
        }

        const passuserData = {
          ...(user.firstName ? { firstName: user.firstName } : {}),
          ...(user.lastName ? { lastName: user.lastName } : {}),
          ...(user.email ? { email: user.email } : {}),
          ...(user.phone ? { phone: user.phone } : {}),
          ...(user.password ? { password: user.password } : {}),
          ...(user.profileImage
            ? { profilePic: profilePic, profilePicThumb: profilethumbUrl }
            : {}),
        };

        console.log(passuserData, 99909675);

        const master = await this.userservice.update(user.userId, passuserData);
        console.log(master.email, 567890)
        await this.mailservice.updateemailforcompanydata(master.email, companyfind.linkedcompany[0].companyName);


      }

      // data.users.map((user) => {
      //   if(user.profileImage){

      //   }
      //   const passuserData =({
      //     ...(user.firstName ? { firstName: user.firstName } : {}),
      //     ...(user.lastName ? { lastName: user.lastName } : {}),
      //     ...(user.email ? { email: user.email } : {}),
      //     ...(user.phone ? { phone: user.phone } : {}),
      //     ...(user.password ? { password: user.password } : {}),
      //     ...(user.profileImage ? { profilePic: user.profileImage } : {}),
      //   });
      //   console.log(passuserData,99909675)

      //   this.userservice.update(user.userId,passuserData)
      // });

      //  = await Promise.all(passuserData.map((user) => this.userservice.update(data.userId, user)));

      // if (data.existingCompanyEmail) {
      //   for (const user of data.users) {
      //     if (user.password && user.email) {
      //       await this.mailservice.sendcompanyCreate(user.password, "user", user.email, user.email);
      //     } else if (user.email) {
      //       await this.mailservice.sendcompanyCreate("password is not changed", "user", user.email, user.email);
      //     } else if (user.password) {
      //       // await this.mailservice.sendcompanyCreate(user.password, "user", data.existingCompanyEmail, "your username is not changed");
      //     } else {
      //       await this.mailservice.sendcompanyCreate("password is not changed. But user profile details are changed", "user", data.existingCompanyEmail, "your username is not changed");
      //     }
      //   }
      // }
    }

    if (Object.keys(passcompanyData).length > 0) {
      await this.companyRepository.update({ id }, passcompanyData);

      // Find the previous record of the employee
      const previousRecord = await this.datahistoryrepo.findOne({
        where: {
          company: +id,
          type: "company-history"
        },
        order: { createdBy: 'DESC' },
      });

      // If a previous record exists, update its endDate
      // if (previousRecord) {
      //   previousRecord.endDate = new Date(Date.now());
      //   await this.datahistoryrepo.save(previousRecord);
      // }
      const responsehistory = await this.datahistoryrepo.create({ type: "company-history", data: JSON.stringify(passcompanyData), company: { id } });
      const res = await this.datahistoryrepo.save(responsehistory);
    }

    return await this.companyRepository.findOne(id, {
      // relations: [
      //   "users",
      //   "documents",
      //   "linkedcompany",
      //   "linkedcompany.mainCompany",
      //   "linkedcompany.mainCompany.users",
      //   "linkedcompany.country",
      //   "linkedcompany.regAddressCountry",
      //   "linkedcompany.companyType",
      //   "linkedcompany.billing",
      // ],
    });
  }

  async updateCompanyStatus(id: number, status) {
    await this.companyinfoRepository.update({ id }, { company_status: () => status });
    return await this.companyRepository.findOne({ id });
  }

  async deactivatecustomerupdate(id: number, data) {
    await this.companyinfoRepository.update(
      { id },
      {
        // scheduleddeactivation: data.scheduledatatime,
        deactivationreason: data.reason,
        deactivationmethod: this.deactivationmethodvalue,

      }
    );
    return await this.companyRepository.findOne({ id });
  }

  async deactivatecustomerupdateimmediate(id: number, data) {
    const currentDateTime = new Date();
    await this.companyinfoRepository.update(
      { id },
      {
        company_status: Companystatus.DEACTIVATE,
        deactivationreason: data.reason,
        deactivationmethod: Deactivationmethod.IMMEDIATE,
      }
    );
    return await this.companyRepository.findOne({ id });
  }

  async scheduledeactivate() {
    const currentDateTime = new Date();

    console.log(currentDateTime.toISOString(), 888);
    const scheduledeactivate = await this.companyRepository.find({
      where: {
        scheduleddeactivation: LessThanOrEqual(currentDateTime.toISOString()),
      },
    });
    console.log(scheduledeactivate, 4343434);
    if (!scheduledeactivate) {
      throw new NotFoundException(` date '${currentDateTime}' not found`);
    }

    for (const item of scheduledeactivate) {
      await this.companyinfoRepository.update(
        item.id,
        {
          company_status: Companystatus.DEACTIVATE,
        }
      );
    }

    return scheduledeactivate;
  }
  async getassignmodule(id) {
    const company = await this.companyRepository.findOne(id, { relations: ["module"] });
    const activeModules = company.module.filter((module) => module.status === 1);
    delete company.module;
    const data = {
      ...company,
      module: activeModules
    }
    return data;

  }

  async getassignpackage(id) {
    return await this.companyRepository.findOne(id, {
      relations: ["package", "package.packages", "package.module"],
    });
  }

  async getcontractagreement(id) {
    return await this.companyRepository.findOne(id);
  }



  async assignpackage(id, data) {
    console.log(id, 77);
    console.log(data.package, 88);
    const entityA = await this.companyRepository.findOne(id, {
      relations: ["package"],
    });
    if (!entityA) {
      throw new NotFoundException("package not found");
    }
    console.log(entityA);
    entityA.package = await this.detailsrepository.findByIds(data.package, { relations: ["packages", "module"] });
    console.log(entityA);
    const currentDateTime = new Date();
    await this.companypackagerowrepository
      .createQueryBuilder()
      .update(Companypackagerow)
      .set({ enddate: currentDateTime })
      .where('companyId = :id', { id })
      .execute();
    let newcompassigndata;
    for (const comppackagedata of entityA.package) {
      console.log(comppackagedata.module.id, 56565)
      if (comppackagedata.packages.customizePackageValue == false) {
        newcompassigndata = {
          rowcount: comppackagedata.NoOfRecords,
          availablerowcount: comppackagedata.NoOfRecords,
          rowprice: comppackagedata.CostPerRecord,
          packageprice: comppackagedata.PackagePrice,
          module: comppackagedata.module.id,
          packages: comppackagedata.packages.id,
          moduledetails: comppackagedata.id,
          company: parseInt(id),
        }
        console.log(newcompassigndata, 5236565)
        const compackageresponse = await this.companypackagerowrepository.create(newcompassigndata)
        const comppackagerowadded = await this.companypackagerowrepository.save(compackageresponse)
      }
    }
    console.log(data.customizerecord, 99)
    let getpkgid;
    for (const newdata of data.customizerecord) {
      console.log(newdata.records, 88998)
      getpkgid = await this.detailsrepository.findOne(newdata.packageId, { relations: ["packages", "module"] });
      newcompassigndata = {
        rowcount: newdata.records,
        availablerowcount: newdata.records,
        rowprice: newdata.costPerRecord,
        packageprice: newdata.packagePrice,
        module: newdata.moduleId,
        packages: getpkgid.packages.id,
        moduledetails: newdata.packageId,
        company: parseInt(id),
      }
      console.log(newcompassigndata, 898989)
      const compackageresponsecustomize = await this.companypackagerowrepository.create(newcompassigndata)
      const comppackagerowaddedcustomiza = await this.companypackagerowrepository.save(compackageresponsecustomize)
      //     const dataf = data.customizerecord[key];
      //     console.log(key,45678)
      //     console.log(dataf.packageId,898989);
      //     if(dataf.packageId){
      //       newcompassigndata={
      //         rowcount:dataf.records,
      //         availablerowcount:dataf.records,
      //         rowprice:dataf.costPerRecord,
      //         packageprice:dataf.packagePrice,
      //         module:key,
      //         packages:dataf.packageId,
      //         company:parseInt(id),
      //       }  
      // console.log(newcompassigndata,8898)
      // const compackageresponsecustomize= await this.companypackagerowrepository.create(newcompassigndata)
      //  const comppackagerowaddedcustomiza = await this.companypackagerowrepository.save(compackageresponsecustomize)
      //     }


    }
    const responese = await this.companyRepository.save(entityA);
    console.log(responese);

    return entityA;

    // return  await this.companyRepository.update(id,data);
  }
  async contractagreement(id, data) {
    return await this.companyRepository.update(id, data);
  }
  async assignpaymentmethod(id, data) {
    console.log(data, 88);
    return await this.companyRepository.update(id, data);
  }

  async getassignpaymentmethod(id) {
    return await this.companyRepository.findOne(id, { relations: ["billing"] });
  }
  async assignmodule(id, data) {
    const entityA = await this.companyRepository.findOne(id, {
      relations: ["module", "package"],
    });
    if (!entityA) {
      throw new NotFoundException("module not found");
    }
    const checkcompanypackagerow = await this.companypackagerowrepository.find({ where: { company: id, enddate: null, trialpackageidentifier: null }, relations: ["module"] });
    let existmoduleid = [];
    for (const existmodule of checkcompanypackagerow) {
      console.log(existmodule.module.id, 8899898)
      existmoduleid.push(existmodule.module.id)
    }
    console.log(existmoduleid, 252435)
    // const moduleid= checkcompanypackagerow.module.id
    const result = existmoduleid.filter(value => !data.module.includes(value));
    console.log(result, 8998988989);

    if (result.length > 0) {
      const currentDateTime = new Date();
      const updatemodule = await this.companypackagerowrepository
        .createQueryBuilder()
        .update(Companypackagerow)
        .set({ enddate: currentDateTime })
        .where('companyId = :id', { id })
        .andWhere('moduleId IN (:...result)', { result })
        .execute();
      console.log(updatemodule, 98989898899)
    }
    entityA.module = await this.modulerepository.findByIds(data.module);
    entityA.package = [];
    console.log(entityA, 999);
    const responese = await this.companyRepository.save(entityA);

    return entityA;
  }

  async addPageToCompany(companyId: number, pageIds: number[]): Promise<void> {
    const company = await this.companyRepository.findOne(companyId, {
      relations: ["pages"],
    });

    const existingPages = company.pages.map((page) => page.id);
    const pagesToRemove = existingPages.filter(
      (pageId) => !pageIds.includes(pageId)
    );
    const pagesToAdd = pageIds.filter(
      (pageId) => !existingPages.includes(pageId)
    );

    if (pagesToRemove.length) {
      company.pages = company.pages.filter(
        (page) => !pagesToRemove.includes(page.id)
      );
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
  async testemail(base_url) {
    // const password = "nuwan@gmail.com";
    // const name = "nuwan";
    // const toemail = "nuwanpriyamal@gmail.com";
    // const username = "dfdfd";
    return await this.mailservice.send_activation_email_admin('nuwanpriyamal@gmail.com', base_url)
    // await this.mailservice.sendcompanyCreate(password, name, toemail, username);
  }


  // send verify email
  async sendverifyemail(data, base_url) {
    return await this.mailservice.sendverifyemailagain(data, base_url)
  }

  // company code check exist 0r not
  async checkcompanycode(code) {
    const checkcodeexist = await this.companyRepository.find({
      where: { company_code: code },
    });
    if (checkcodeexist.length > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  async decodemyactivatetoken(key) {
    const decodedkey = await this.mailservice.decodemyactivatetoken(key);
    const currentDateTime = new Date();
    const updateuserdata = {
      activate: 1,
      activated_time: currentDateTime
    }
    console.log(decodedkey, 999)
    if (decodedkey.hasOwnProperty('email') && decodedkey.hasOwnProperty('email') && decodedkey.hasOwnProperty('exp')) {
      console.log('decodedkey', 999)
      const exist = await this.userRepository.findOne({ email: decodedkey['email'] })
      if (exist.activate == true) {
        return "You are already activated";
      } else {
        const updateresponse = await this.userRepository.update({ email: decodedkey['email'] }, updateuserdata);
        return "activated";
      }
    } else {
      return decodedkey
    }

  }

  async generatepaymentlink(companyId, base_url) {

    // const paymentid = randomstring.generate({
    //   length: 4,
    //   charset: 'numeric'
    // });
    // const updatecompany = await this.companyRepository.update({ id: companyId }, { paymentlinkotp: paymentid })
    // const comapny = await this.companyRepository.findOne(companyId);
    // const companyemail = comapny.companyEmail
    // return await this.mailservice.generatepaymentlink(companyemail, companyId, base_url, paymentid)
  }

  async verifypaymentdetailstoken(token) {
    // const verifyresponse = await this.mailservice.verifypaymentdetailstokendecode(token);
    // if (verifyresponse["id"]) {
    //   let id = verifyresponse["id"]
    //   const company = await this.companyinfoRepository.findOne(id);
    //   const companyemail = company.companyEmail
    //   const paymentid = company.paymentlinkotp
    //   if ((verifyresponse["paymenttokenid"] == paymentid) && (verifyresponse["email"] == companyemail)) {
    //     const data = {
    //       id: id,
    //       email: companyemail,
    //     }
    //     return data
    //   } else {
    //     return "Invalid token"
    //   }
    // } else {
    //   return verifyresponse
    // }

  }

  async paiddataupdate(token) {
    // console.log(token)
    // const verify = await this.mailservice.verifypaymentdetailstokendecode(token);
    // // const verify=await this.verifypaymentdetailstoken(token)
    // console.log(verify, 898)
    // if (verify["id"]) {
    //   const updateresponse = await this.companyRepository.update({ id: verify["id"] }, { compstatus: 5, paymentlinkotp: null });
    //   return "payment completed"
    // } else {
    //   return "payment not complete"
    // }
  }

  async changeparentadmin(id, data) {

    // const passdata = {
    //   companyIdentifier: "maincompany",
    //   mainCompany: null,
    // }
    // const response = await this.companyRepository.update({ id }, passdata);
  }

  async extendtrial(data) {
    // const numofdays = data.numofdays
    // const updateDateTime = new Date(data.validitydate);
    // updateDateTime.setDate(updateDateTime.getDate() + parseInt(data.numofdays));
    // console.log(updateDateTime, 98898998989898)
    // updateDateTime.setMilliseconds(0);

    // const passdata = {
    //   validityperiod: updateDateTime,
    // }
    // console.log(passdata, 77)
    // const response = await this.companyRepository.update({ id: data.id }, passdata)
    // console.log(response, 88)
    // const createdbydata=await this.userRepository.findOne({where:{id:data.createdby}})
    // // Find the previous record of the employee
    // const previousRecord = await this.datahistoryrepo.findOne({
    //   where: {
    //     company: +data.id,
    //     type: "Trial-extend-history"
    //   },
    //   order: { createdBy: 'DESC' },
    // });

    // // If a previous record exists, update its endDate
    // if (previousRecord) {
    //   previousRecord.endDate = new Date(Date.now());
    //   previousRecord.editedBy=createdbydata
    //   await this.datahistoryrepo.save(previousRecord);
    // }
    // const responsehistory = await this.datahistoryrepo.create({ type: "Trial-extend-history", data: JSON.stringify(passdata), company:{id:data.id},createdBy:createdbydata });
    // const res = await this.datahistoryrepo.save(responsehistory);

    // if (response) {
    //   return "Updated"
    // } else {
    //   return "Error Occured"
    // }
  }
  async cancelrial(id, data) {
    //     // createdby
    //     const createdbydata=await this.userRepository.findOne({where:{id:data.createdby}})
    // const currentDateTime=new Date();
    //     const passdata = {
    //       compstatus: 2,
    //       validityperiod: null,
    //       deactivationreason:"trial cancel",
    //       deactivationmethod:"immediate",
    //       deactivatedtime:currentDateTime,
    //       deactivatedby:data.createdby
    //     }
    //     const response = await this.companyRepository.update({ id }, passdata)

    //     // Find the previous record of the employee
    //     const previousRecord = await this.datahistoryrepo.findOne({
    //       where: {
    //         company: +id,
    //         type: "cancel-trial"
    //       },
    //       order: { createdBy: 'DESC' },
    //     });

    //     // If a previous record exists, update its endDate
    //     if (previousRecord) {
    //       previousRecord.endDate = new Date(Date.now());
    //       previousRecord.editedBy=createdbydata
    //       await this.datahistoryrepo.save(previousRecord);
    //     }
    //     const responsehistory = await this.datahistoryrepo.create({ type: "cancel-trial", data: JSON.stringify(passdata), company:{id},createdBy:createdbydata });
    //     const res = await this.datahistoryrepo.save(responsehistory);


    //     console.log(response, 88)
    //     if (response) {
    //       return "Trial Canceled"
    //     } else {
    //       return "Error Occured"
    //     }

  }
}
