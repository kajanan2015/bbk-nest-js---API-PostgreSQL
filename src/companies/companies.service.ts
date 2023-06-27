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
} from "typeorm";
import { CompaniesDTO } from "./companies.dto";
import { CompaniesEntity } from "./companies.entity";
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
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
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
    private readonly companyrowpackageservice:CompanypackagerowService,
    @InjectRepository(Companypackagerow)
    private readonly companypackagerowrepository: Repository<Companypackagerow>,
  ) { }

  async showAll() {
    return await this.companyRepository.find({
      where: { status: 1, companyIdentifier: "maincompany" },
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

  async showcompanylist(value) {
    const companylist = await this.companyRepository.findOne({
      where: {
        id: value,
      },
      relations: ["mainCompany"],
    });
    return await this.companyRepository.find({
      where: {
        mainCompany: companylist.mainCompany.id,
      },
    });
  }

  async showonlySubCompany() {
    return await this.companyRepository.find({
      where: { status: 1, mainCompany: Not(IsNull()) },
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

  async showonlyActivemainCompany(value) {
    return await this.companyRepository.find({
      where: { status: 1, compstatus: value },
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
      order: {
        mainCompany: "ASC",
      },
    });
  }

  async showonlyActivesubCompany(value) {
    return await this.companyRepository.find({
      where: { status: 1, companyIdentifier: "subcompany", compstatus: value },
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

  async getcompanyType() {
    const query = "SELECT * FROM `companyType`";
    const companyTypeList = await this.connection.query(query);
    return companyTypeList;
  }

  async getcountry() {
    const query = "SELECT * FROM `country`";
    const countryList = await this.connection.query(query);
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

  async create(companyData,base_url) {
    const existingcompanyname = await this.companyRepository.findOne({
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

    if (companyData.parentCompany && companyData.parentCompany != "") {
      const users = [];
      const company = await this.companyRepository.findOne(
        companyData.parentCompany,
        {
          relations: ["users"],
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
        // console.log(adminUser, 88889)
        for (var i = 0; i < adminUser.length; i++) {
          users.push(adminUser[i]);
          await this.mailservice.shareaccesstochildcompany(adminUser[i].email, companyData.companyName, adminUser[i].firstName, company.companyName);
        }
        // console.log(users, 999)
        for (const admin of adminUsers) {
          existing = await this.userservice.findByEmailexist(admin.email);
          if (existing) {
            return "account exist";
          }
          // console.log(admin, 7890);
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


          await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password,base_url);

          // userIds.push(adminResponse.id.toString());
          const userId = adminResponse.id.toString();
          // userIds.push(adminResponse.id.toString());
          const adminUser = await this.userRepository.findByIds(userId);
          // console.log(adminUser)
          users.push(adminUser[0]);
          // userId = adminResponse.id.toString();
          // console.log(userId,5678)

          // console.log(adminUser,5678)

          // console.log(dataCompany,678)
        }
      } else {

        if (companyData.parentCompanyAdmin) {
          for (const value of companyData.parentCompanyAdmin) {
            // console.log(value, 77777);
            userIds.push(value);
          }
          let adminUser;
          adminUser = await this.userRepository.findByIds(userIds);
          // console.log(userIds, 99090)
          // console.log(adminUser, 88889)
          for (var i = 0; i < adminUser.length; i++) {
            users.push(adminUser[i]);
            console.log(adminUser[i], 99900909099990)
            console.log(adminUser[i].email, 99900909099990)
            await this.mailservice.shareaccesstochildcompany(adminUser[i].email, companyData.companyName, adminUser[i].firstName, company.companyName);
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
            await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password,base_url);


            const userId = adminResponse.id.toString();
            // userIds.push(adminResponse.id.toString());
            const adminUser = await this.userRepository.findByIds(userId);
            // console.log(adminUser)
            users.push(adminUser[0]);
            // console.log(users, 90090099090099009)
            // adminUser = await this.userRepository.findByIds([userId]);
            // users.push(adminUser[0]);
          }
        } else {
          // await this.mailservice.sendcompanyCreate("", companyData.companyName, companyData.companyEmail, "");
        }
      }
      // const users = await this.userRepository.findByIds(userIds);
      // console.log(userIds, 56789)/
      // console.log(users,56789)

      // console.log(users, 67890)
      if (!companyData.sameTradingAddress) {
        dataCompany = {
          ...companyData,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyCode: companyCode,
          users: users,
          mainCompany: companyData.parentCompany,
          documents: files,
          companyIdentifier: "subcompany"
        }
      } else {
        dataCompany = {
          ...companyData,
          regAddressNo: companyData.number,
          regAddressStreet: companyData.street,
          regAddressCity: companyData.city,
          regAddressPostalCode: companyData.postalCode,
          regAddressCountry: companyData.country,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyCode: companyCode,
          users: users,
          mainCompany: companyData.parentCompany,
          documents: files,
          companyIdentifier: "subcompany"
        }
      }

      // console.log(dataCompany, 45678);
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

        await this.mailservice.newadminadded(admin.email, companyData.companyName, admin.firstName, admin.password,base_url);


        const userId = adminResponse.id.toString();
        const adminUser = await this.userRepository.findByIds([userId]);
        users.push(adminUser[0]);
      }
      if (!companyData.sameTradingAddress) {
        dataCompany = {
          ...companyData,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyCode: companyCode,
          users: users,
          documents: files,
          companyIdentifier: "maincompany",
        };
      } else {
        dataCompany = {
          ...companyData,
          regAddressNo: companyData.number,
          regAddressStreet: companyData.street,
          regAddressCity: companyData.city,
          regAddressPostalCode: companyData.postalCode,
          regAddressCountry: companyData.country,
          companyLogo: companyData.logoImg,
          companyLogoThumb: companythumbUrl,
          companyCode: companyCode,
          users: users,
          documents: files,
          companyIdentifier: "maincompany",
        };
      }
    }

    await this.systemcodeService.update(response.id, newstartvalue);
    const trialpackagedata= await this.pkgrepository.findOne({where:{packagename:"Trial",validity:0,enddate:null},relations:['packagedetails']})
console.log(trialpackagedata,56)
dataCompany.package=trialpackagedata.packagedetails;
    const newCompany = await this.companyRepository.create(dataCompany);
    const responsesave = await this.companyRepository.save(newCompany);
console.log(dataCompany,453)
console.log(newCompany,43534)
    await this.mailservice.companycreationsuccess(dataCompany.companyEmail, "adminemail", "adminname", dataCompany.companyName, process.env.main_url);
    if (dataCompany.companyIdentifier == "maincompany") {
      const query = `
   UPDATE company
   SET parentCompanyId = '${responsesave["id"]}'
   WHERE id = '${responsesave["id"]}'
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

  async findById(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne({ id });
  }

  async getmatchsubcompany(id: number) {
    return await this.companyRepository.find({
      where: { status: 1, mainCompany: id },
      // relations: ['mainCompany','users']
    });
  }

  async read(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne(id, {
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
          await this.companyRepository.update({ id }, datalogo);
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
        await this.mailservice.updateemailforcompanydata(master.email, companyfind.companyName);


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
    }

    return await this.companyRepository.findOne(id, {
      relations: [
        "mainCompany",
        "users",
        "documents",
        "country",
        "regAddressCountry",
        "companyType",
        "billing",
      ],
    });
  }

  async updateCompanyStatus(id: number, status) {
    await this.companyRepository.update({ id }, { compstatus: () => status });
    return await this.companyRepository.findOne({ id });
  }

  async deactivatecustomerupdate(id: number, data) {
    await this.companyRepository.update(
      { id },
      {
        scheduleddeactivation: data.scheduledatatime,
        deactivationreason: data.reason,
        deactivationmethod: "scheduled",
        deactivatedby: data.userId,
      }
    );
    return await this.companyRepository.findOne({ id });
  }

  async deactivatecustomerupdateimmediate(id: number, data) {
    const currentDateTime = new Date();
    await this.companyRepository.update(
      { id },
      {
        compstatus: 2,
        deactivationreason: data.reason,
        deactivatedtime: currentDateTime,
        deactivationmethod: "immediate",
        deactivatedby: data.userId,
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
      await this.companyRepository.update(item.id, {
        compstatus: 2,
        scheduleddeactivation: null,
        deactivatedtime: currentDateTime,
      });
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
    entityA.package = await this.detailsrepository.findByIds(data.package);
    console.log(entityA);
   
   
   
    let newcompassigndata;
    for(const comppackagedata of entityA.package){
      newcompassigndata={
        rowcount:comppackagedata.NoOfRecords,
        availablerowcount:comppackagedata.NoOfRecords,
        rowprice:comppackagedata.CostPerRecord,
        packageprice:comppackagedata.PackagePrice,
        module:comppackagedata.module.id,
        packages:comppackagedata.packages.id,
        company:comppackagedata.id,
      }  
      await this.companypackagerowrepository.create(newcompassigndata)
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
    return await this.mailservice.send_activation_email_admin('nuwanpriyamal@gmail.com',base_url)
    // await this.mailservice.sendcompanyCreate(password, name, toemail, username);
  }


  // send verify email
async sendverifyemail(data, base_url){
  return await this.mailservice.sendverifyemailagain(data,base_url)
}
  
// company code check exist 0r not
  async checkcompanycode(code) {
    const checkcodeexist = await this.companyRepository.find({
      where: { code },
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
    console.log(decodedkey,999)
    if(decodedkey.hasOwnProperty('email')&&decodedkey.hasOwnProperty('email')&&decodedkey.hasOwnProperty('exp')){
      console.log('decodedkey',999)
      const exist = await this.userRepository.findOne({ email: decodedkey['email'] })
      if (exist.activate == true) {
        return "You are already activated";
      } else {
        const updateresponse = await this.userRepository.update({ email: decodedkey['email'] }, updateuserdata);
        return "activated";
      }
    }else{
      return decodedkey
    }
   
  }

  async generatepaymentlink(companyId,base_url){

    const paymentid = randomstring.generate({
      length: 4,
      charset: 'numeric'
    });
    const updatecompany=await this.companyRepository.update({id:companyId},{paymentlinkotp: paymentid})
    const comapny= await this.companyRepository.findOne(companyId);
    const companyemail=comapny.companyEmail
    return await this.mailservice.generatepaymentlink(companyemail, companyId,base_url,paymentid)
  }

  async verifypaymentdetailstoken(token){
    const verifyresponse=await  this.mailservice.verifypaymentdetailstokendecode(token);
    if(verifyresponse["id"]){
      let id=verifyresponse["id"]
      const company= await this.companyRepository.findOne(id);
      const companyemail=company.companyEmail
      const paymentid= company.paymentlinkotp
      if((verifyresponse["paymenttokenid"]==paymentid)&&(verifyresponse["email"]==companyemail)){ 
        const data={
          id:id,
          email:companyemail,
        }
        return data
      }else{
        return "Invalid token"
      }
    }else{
      return verifyresponse
    }
    
  }

  async paiddataupdate(token){
    const verify=await this.verifypaymentdetailstoken(token)
    if(verify["id"]){
      const updateresponse=await this.companyRepository.update({id:verify["id"]},{compstatus:5});
      return "payment completed"
    }else{
      return "payment not complete"
    }
  }

}
