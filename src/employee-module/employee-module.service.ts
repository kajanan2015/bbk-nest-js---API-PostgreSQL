import { HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository, SelectQueryBuilder, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';
import { CompaniesService } from 'src/companies/companies.service';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { MailService } from 'src/mail/mail.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { Gender } from './gender/gender.entity';
import { UserService } from 'src/user/user.service';
import { DrivingLicenceCategory } from './driving_licence_category/driving_licence_category.entity';
import { Bank } from './bank/bank.entity';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { DrivingLicenceType } from './driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from './payment_frequency/payment_frequency.entity';
import { Employee, EmployeeInfo, EmployeePayrollInfo } from './employee-module.entity';
import { VisaType } from './visa_type/visaType.entity';
// import randomstring from 'randomstring';
const randomstring = require("randomstring");

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly connection: Connection,
    private readonly employeedocumentservice: EmployeeDocumentService,
    private companyservice: CompaniesService,
    private readonly imageUploadService: ImageUploadService,
    @InjectRepository(EmployeeInfo)
    private employeeInfoRepository: Repository<EmployeeInfo>,
    @InjectRepository(EmployeePayrollInfo)
    private employeePayrollRepository: Repository<EmployeePayrollInfo>,
    @InjectRepository(EmployeeDocument)
    private employeeDocumentRepository: Repository<EmployeeDocument>,
    private readonly mailservice: MailService,
    @InjectRepository(EmployeeDataHistory)
    private employeedatahistoryrepo: Repository<EmployeeDataHistory>,
    private readonly userservice: UserService,
    @InjectRepository(DrivingLicenceCategory)
    private readonly drivingLicenceCategoryRepository: Repository<DrivingLicenceCategory>,
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
    @InjectRepository(EmployeeType)
    private readonly empTypeRepository: Repository<EmployeeType>,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
    @InjectRepository(EmpDesignation)
    private readonly empDesignationRepository: Repository<EmpDesignation>,
    @InjectRepository(CompaniesEntity)
    private readonly companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(MaritalStatus)
    private readonly maritalStatusRepository: Repository<MaritalStatus>,
    @InjectRepository(VisaType)
    private readonly visaTyeRepository: Repository<VisaType>,
    @InjectRepository(DrivingLicenceType)
    private readonly dlTypeRepository: Repository<DrivingLicenceType>,
    @InjectRepository(PaymentFrequency)
    private readonly paymentFreqRepository: Repository<PaymentFrequency>,
    @InjectRepository(DrivingLicenceCategory)
    private readonly dlCategoryRepository: Repository<DrivingLicenceCategory>,
  ) { }

  async create(createEmployeeModuleDto) {
    const existingEmployee = await this.employeeRepository.findOne({ where: { employeeCode: createEmployeeModuleDto.employeeCode } });
    if (existingEmployee) {

      const { providedCopyUrl, empProvidedCopyUrl, filenames, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
      const data = {
        ...dataWithouturl
      }

      const documents = createEmployeeModuleDto['filenames'];

      const { employeeCode, company, ...infoData } = data

      const existingEmployeeInfo = await this.employeeInfoRepository.findOne({ where: { employee: existingEmployee.id } });
      const res = await this.employeeInfoRepository.update({ id: existingEmployeeInfo.id }, infoData);

      if (documents.length > 0) {
        for (let document in documents) {
          const docEntry = documents[document];
          for (const doc in docEntry as {}) {
            const docType = doc;
            const docUrls = docEntry[doc]
            let empExsistDocRow;
            if (docType == "empProvidedCopy[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+existingEmployee['id'], 'empProvidedCopy')
            }
            if (empExsistDocRow) {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee['id'], created_by: data.addedBy })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee['id'], created_by: data.addedBy })
              };
              await this.employeedocumentservice.create(empdocs)
            }

          }
        }
      }

      const returnData = await this.employeeRepository.findOne({
        where: { id: existingEmployee.id },
        relations: ['documents']
      });

      return { infoId: existingEmployeeInfo.id, ...returnData }

    } else {
      const existingEmployeeInfo = await this.employeeInfoRepository.findOne({ where: { email: createEmployeeModuleDto.email } });
      const existingEmployee = await this.employeeRepository.findOne({ where: { company: createEmployeeModuleDto.company } });

      if (existingEmployee && existingEmployeeInfo) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: "User already exists!",
        };
      }

      //const { providedCopyUrl, empProvidedCopyUrl, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
      const { profilePicUrl, employeeCode, company, ...infoData } = createEmployeeModuleDto;

      const response = await this.employeeRepository.create({ employeeCode, company, linkedEmployee: infoData, created_at: infoData.created_at, created_by: infoData.created_by });
      const res = await this.employeeRepository.save(response);

      const responseInfo = await this.employeeInfoRepository.create({ ...infoData, employee: res.id });
      const resInfo = await this.employeeInfoRepository.save(responseInfo)

      const documents = createEmployeeModuleDto['filenames'];

      //  to create account login account for user
      const employeerandompassword = randomstring.generate({
        length: 8,
        charset: 'alphanumeric',
        readable: true,
        symbols: true,
      });
      const currentDateTime = new Date();
      const employeeaccountcreationdata = {
        firstName: createEmployeeModuleDto.firstName,
        lastName: createEmployeeModuleDto.lastName,
        uType: "EMPLOYEE",
        profilePic: createEmployeeModuleDto.profilePic,
        profilePicThumb: createEmployeeModuleDto.profilePicThumb,
        password: employeerandompassword,
        phone: createEmployeeModuleDto.mobilePhone,
        email: createEmployeeModuleDto.employeeCode,
        activate: 1,
        activated_time: currentDateTime
      };

      const adminResponse = await this.userservice.create(employeeaccountcreationdata);

      // added for send email and password to the user 
      await this.mailservice.sendemailtoemployeeregistration(createEmployeeModuleDto.email, "ABC", createEmployeeModuleDto.firstName, employeerandompassword, createEmployeeModuleDto.employeeCode)


      if (documents.length > 0) {
        for (let document in documents) {
          const docEntry = documents[document];
          for (const doc in docEntry as {}) {
            const docType = doc;
            const docUrls = docEntry[doc]
            let empExsistDocRow;
            if (docType == "empProvidedCopy[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+res['id'], 'empProvidedCopy')
            }
            if (empExsistDocRow) {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +res['id'], created_by: createEmployeeModuleDto.addedBy })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +res['id'], created_by: createEmployeeModuleDto.addedBy })
              };
              await this.employeedocumentservice.create(empdocs)
            }

          }
        }
      }

      const returnData = await this.employeeRepository.findOne({
        where: { employeeCode: createEmployeeModuleDto.employeeCode },
        relations: ['documents']
      });

      return { infoId: resInfo['id'], ...returnData }
    }
  }

  async createPayrollInfo(createEmployeeModuleDto) {

    const employee = await this.employeeRepository.findOne({ where: { employeeCode: createEmployeeModuleDto.employeeCode } });

    const { employeeCode, ...data } = createEmployeeModuleDto;

    const existingRecord = await this.employeePayrollRepository.findOne({ where: { employee: employee['id'] } });

    if (!existingRecord) {

      const response = await this.employeePayrollRepository.create({ employee: employee['id'], ...data });
      const res = await this.employeePayrollRepository.save(response);

      const returnData = await this.employeePayrollRepository.findOne({
        where: { employee: employee.id },
      });

      return returnData

    } else {

      const res = await this.employeePayrollRepository.update({ id: existingRecord['id'] }, data);

      const returnData = await this.employeePayrollRepository.findOne({
        where: { employee: employee['id'] },
      });

      return returnData

    }
  }

  async getGender() {
    const genderList = await this.genderRepository.find();
    return genderList;
  }

  async createBank(bank) {
    const existingBank = await this.bankRepository.findOne({
      where: [
        { bankName: bank.bankName },
        { sortCode: bank.sortCode }
      ]
    });
    if (existingBank) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: "Bank already exists!",
      };
    }
    const res = this.bankRepository.create(bank)
    return await this.bankRepository.save(res);
  }

  async getEmployeeType() {
    const employeeTypeList = await this.empTypeRepository.find();
    return employeeTypeList;
  }
  async getDesignation() {
    const designationList = await this.empDesignationRepository.find();
    return designationList;
  }
  async getCompany() {
    const companyList = this.companyRepository.find()
    return companyList;
  }

  async getMaritalStatus() {
    const maritalStatusList = await this.maritalStatusRepository.find();
    return maritalStatusList;
  }

  async getVisaType() {
    const visaTypeList = await this.visaTyeRepository.find();
    return visaTypeList;
  }

  async getDrivingLicenceType() {
    const drivingLicenceTypeList = await this.dlTypeRepository.find();
    return drivingLicenceTypeList;
  }

  async getPaymentFrequency() {
    const paymentFrequencyTypeList = await this.paymentFreqRepository.find();
    return paymentFrequencyTypeList;
  }

  async getBank() {
    const bankTypeList = await this.bankRepository.find();
    return bankTypeList;
  }

  async getDrivingLicenceCategory() {
    const getDrivingLicenceCategory = await this.dlCategoryRepository.find();
    return getDrivingLicenceCategory;
  }

  async generateemployeeid(id) {
    const individualcompany = await this.companyservice.read(id)
    let randomId = randomstring.generate({
      length: 7,
      charset: 'numeric'
    });

    let newrandomId = individualcompany.company_code + '-' + randomId;;
    let response = await this.employeeRepository.find({ where: { employeeCode: newrandomId } });


    while (response.length > 0) {
      randomId = randomstring.generate({
        length: 7,
        charset: 'numeric'
      });
      newrandomId = individualcompany.company_code + '-' + randomId;
      response = await this.employeeRepository.find({ where: { employeeCode: newrandomId } });
    }
    return newrandomId;
  }

  // async findById(id: number) {
  //   return await this.employeeInfoRepository.findOne({
  //     where: { id: +id },
  //     relations: ['drivingLicenceCategory', 'documents', 'drivingLicenceType', 'employeeType', 'created_by', 'designation', 'company', 'gender', 'maritalStatus', 'bankName', 'paymentFrequency', 'addressCountry', 'refCompAddressCountry']
  //   });
  // }

  //Get payroll-info table data using employee
  async findEmployeePayrollData(employeeId: number) {
    const existingEmployee = await this.employeePayrollRepository.findOne({ where: { employee: employeeId } });
    return existingEmployee
  }

  async findById(id: number) {
    const date = new Date();
    const query: SelectQueryBuilder<Employee> = getConnection()
      .getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.company", "company")
      .leftJoinAndSelect("employee.documents", "documents")
      .leftJoinAndSelect("employee.linkedEmployee", "linkedEmployee")
      .leftJoinAndSelect("linkedEmployee.employeeType", "employeeType")
      .leftJoinAndSelect("linkedEmployee.bankName", "bankName")
      .leftJoinAndSelect("linkedEmployee.designation", "designation")
      .leftJoinAndSelect("linkedEmployee.gender", "gender")
      .leftJoinAndSelect("linkedEmployee.maritalStatus", "maritalStatus")
      .leftJoinAndSelect("linkedEmployee.drivingLicenceType", "drivingLicenceType")
      .leftJoinAndSelect("linkedEmployee.drivingLicenceCategory", "drivingLicenceCategory")
      .leftJoinAndSelect("linkedEmployee.visaType", "visaType")
      .leftJoinAndSelect("linkedEmployee.created_by", "created_by")
      .leftJoinAndSelect("linkedEmployee.addressCountry", "addressCountry")
      .leftJoinAndSelect("linkedEmployee.refCompAddressCountry", "refCompAddressCountry")
      .andWhere("employee.id = :id", { id })
      .andWhere("linkedEmployee.start_date <= :date", { date })
      .andWhere(
        "(linkedEmployee.end_date IS NULL OR linkedEmployee.end_date > :date)",
        { date }
      )
      .orderBy('linkedEmployee.start_date', 'DESC');;

    const data = await query.getMany();
    const newdata = [];

    for (var i = 0; i < data.length; i++) {
      let passdata = {}
      const { linkedEmployee, ...mainEmployeeData } = data[i];
      const companyData = await this.companyservice.read(mainEmployeeData?.company?.id);
      passdata = {
        ...linkedEmployee[0],
        id: mainEmployeeData.id,
        infoId: linkedEmployee[0].id,
        employeeCode: mainEmployeeData.employeeCode,
        company: companyData,
        documents: mainEmployeeData.documents
      }
      newdata.push(passdata)
    }

    return newdata;
  }

  // async update(id: number, UpdateEmployeeModuleDto: UpdateEmployeeModuleDto) {
  //   await this.employeeInfoRepository.update({ id }, UpdateEmployeeModuleDto);
  //   return await this.employeeInfoRepository.findOne({ id });
  // }
  async update(id: string, UpdateEmployeeModuleDto) {
    const empdata = {
      ...UpdateEmployeeModuleDto
    }

    const { employeeCode, ...data } = empdata;

    console.log(data, 6666666666666666)

    const existingEmployee = await this.employeeRepository.findOne({ where: { employeeCode: id } });
    const employeerowid = await this.employeeInfoRepository.findOne({ where: { employee: existingEmployee.id }, relations: ['drivingLicenceCategory'] });

    if (data.hasOwnProperty("drivingLicenceCategory")) {
      const drivingLicenceCategories = data.drivingLicenceCategory;
      let drivinglicensecategoryId = [];
      for (const categoryid of data.drivingLicenceCategory) {
        drivinglicensecategoryId.push(categoryid.id)
      }
      console.log(drivinglicensecategoryId, 5654)
      const repsonse1 = await this.drivingLicenceCategoryRepository.findByIds(drivinglicensecategoryId)
      employeerowid.drivingLicenceCategory = repsonse1;
      const response3333 = await this.employeeInfoRepository.save(employeerowid)

      delete data.drivingLicenceCategory;
    }

    const documents = data['filenames'];
    if (documents?.length > 0) {
      for (let document in documents) {
        const docEntry = documents[document];
        for (const doc in docEntry as {}) {
          const docType = doc;
          const docUrls = docEntry[doc]
          if (docType == "visaDoc[]" || docType == "empProvidedCopy[]" || docType == "officialDoc[]") {
            let empExsistDocRow;
            if (docType == "empProvidedCopy[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+existingEmployee.id, 'empProvidedCopy')
            } else if (docType == "officialDoc[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+existingEmployee.id, 'officialDoc')
            } else if (docType == "visaDoc[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+existingEmployee.id, 'visaDoc')
            }
            if (empExsistDocRow) {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee.id, created_by: data.created_by })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee.id, created_by: data.created_by })
              };
              await this.employeedocumentservice.create(empdocs)
            }
          } else if (docType == "contractDoc[]" || docType == "offerLetterDoc[]" ||
            docType == "refdoc[]" || docType == "drivingLicenceDoc[]" || docType == "tachoDoc[]"
            || docType == "cpcCardDoc[]" || docType == "crbCardDoc[]") {
            console.log(docType)
            const empdocs = []
            for (const url in docUrls as {}) {
              empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee.id, created_by: data.created_by })
            };
            await this.employeedocumentservice.create(empdocs)
          } else {
            const empdocs = []
            for (const url in docUrls as {}) {
              empdocs.push({ docType: docType.replace('[]', ''), description: 'additional', docPath: docUrls[url], empid: +existingEmployee.id, created_by: data.created_by })
            };
            await this.employeedocumentservice.create(empdocs)
          }
        }
      }
    }

    if (data["deletedDocs"]) {
      let deletedocuments = data["deletedDocs"];
      for (const doc in data["deletedDocs"]) {
        const deletedocument = await this.employeeDocumentRepository.find({
          where: { docPath: deletedocuments[doc] },
        });
        await this.imageUploadService.deletedoc(deletedocuments[doc])
        await this.employeeDocumentRepository.remove(deletedocument)
      }

    }

    delete data['deletedDocs'];
    delete data['filenames'];

    await this.employeeInfoRepository.update({ id: +employeerowid.id }, data);

    const updatedEmployee = await this.employeeInfoRepository.findOne({
      where: { id: employeerowid.id }
    });

    const existingPayrollRecord = await this.employeePayrollRepository.findOne({ where: { employee: existingEmployee['id'] } });

    if (updatedEmployee.isNonNative != null && updatedEmployee.bankAccountNo != null && existingPayrollRecord.salaryType != null) {
      await this.employeeInfoRepository.update({ id: +employeerowid.id }, { active: true });
    }

    // return await this.employeeInfoRepository.findOne({
    //   where: { id: employeerowid.id },
    //   relations: ['drivingLicenceCategory', 'documents']
    // });

    const returnData = await this.employeeRepository.findOne({
      where: { employeeCode: employeeCode },
      relations: ['documents']
    });

    return { infoId: employeerowid['id'], ...returnData }
  }

  async updateWithHistory(id: string, UpdateEmployeeModuleDto) {

    let data = {
      ...UpdateEmployeeModuleDto.data
    }

    // ** get employee table data
    const employeerow = await this.employeeRepository.findOne({ where: { id: +UpdateEmployeeModuleDto.employeeId } });
    // ** get employee info table data
    const employeeInforow = await this.employeeInfoRepository.findOne({ where: { id: +UpdateEmployeeModuleDto.employeeInfoId }, relations: ['employeeType', 'drivingLicenceCategory', 'designation', 'gender', 'maritalStatus', 'addressCountry', 'refCompAddressCountry', 'drivingLicenceType', 'bankName', 'created_by', 'updated_by', 'employee'] });

    // ** shedule start date
    const start_date = new Date(UpdateEmployeeModuleDto.start_date)

    // ** current date
    const date = new Date();

    // ** get history record id
    const employeeHistoryId = UpdateEmployeeModuleDto.employeeHistoryId;
    delete UpdateEmployeeModuleDto.employeeHistoryId;

    // ** get latest shedule data before start date
    const query: SelectQueryBuilder<EmployeeInfo> = getConnection()
      .getRepository(EmployeeInfo)
      .createQueryBuilder("employeeInfo")
      .leftJoinAndSelect("employeeInfo.employeeType", "employeeType")
      // .leftJoinAndSelect("employeeInfo.drivingLicenceCategory", "drivingLicenceCategory")
      .leftJoinAndSelect("employeeInfo.designation", "designation")
      .leftJoinAndSelect("employeeInfo.gender", "gender")
      .leftJoinAndSelect("employeeInfo.maritalStatus", "maritalStatus")
      .leftJoinAndSelect("employeeInfo.addressCountry", "addressCountry")
      .leftJoinAndSelect("employeeInfo.refCompAddressCountry", "refCompAddressCountry")
      .leftJoinAndSelect("employeeInfo.drivingLicenceType", "drivingLicenceType")
      .leftJoinAndSelect("employeeInfo.bankName", "bankName")
      .leftJoinAndSelect("employeeInfo.visaType", "visaType")
      .leftJoinAndSelect("employeeInfo.created_by", "created_by")
      .leftJoinAndSelect("employeeInfo.updated_by", "updated_by")
      .leftJoinAndSelect("employeeInfo.employee", "employee")
      .andWhere("employeeInfo.employee = :id", { id: +UpdateEmployeeModuleDto.employeeId })
      .andWhere("employeeInfo.startDate <= :date", { date: start_date })
      .orderBy('employeeInfo.startDate', 'DESC');
    const latestSheduleInfo = await query.getOne();

    // ** update latest shedule record updated date and updated by
    await this.employeeInfoRepository.update({ id: +latestSheduleInfo.id }, { endDate: UpdateEmployeeModuleDto.created_at, updated_by: UpdateEmployeeModuleDto.created_by, ...latestSheduleInfo });

    // ** save employee driving licence categories
    if (data.hasOwnProperty("drivingLicenceCategory")) {
      const drivingLicenceCategories = data.drivingLicenceCategory;
      let drivinglicensecategoryId = [];
      for (const categoryid of data.drivingLicenceCategory) {
        drivinglicensecategoryId.push(categoryid.id)
      }
      const repsonse1 = await this.drivingLicenceCategoryRepository.findByIds(drivinglicensecategoryId)
      employeeInforow.drivingLicenceCategory = repsonse1;
      const response3333 = await this.employeeInfoRepository.save(employeeInforow)
      // delete data.drivingLicenceCategory;
    }

    // ** remove docs
    let { visaDoc, drivingLicenceCategory, tachoDoc, officialDoc, drivingLicenceDoc, cpcCardDoc, refdoc, empProvidedCopy, ...dataWithoutDoc } = data

    if (employeeHistoryId) {

      const previousRecord = await this.employeedatahistoryrepo.findOne({
        where: {
          id: employeeHistoryId
        },
        relations: ['employeeInfoId']
      });

      // ** update employee info currnt record
      await this.employeeInfoRepository.update({ id: +previousRecord?.['employeeInfoId']?.['id'] }, dataWithoutDoc);


    } else {
      // ** compare shedule start date
      if (Math.floor(start_date.getTime() / 86400000) > Math.floor(date.getTime() / 86400000)) {
        delete latestSheduleInfo.id;
        delete latestSheduleInfo.updated_at;
        delete latestSheduleInfo.endDate;
        delete latestSheduleInfo.startDate;
        delete latestSheduleInfo.updated_by;
        const passvalue = {
          ...latestSheduleInfo, ...dataWithoutDoc
        }

        // ** create new employee info record
        const responseInfo = await this.employeeInfoRepository.create({ ...passvalue, startDate: UpdateEmployeeModuleDto.start_date, employee: UpdateEmployeeModuleDto.employeeId });
        const resInfo = await this.employeeInfoRepository.save(responseInfo)

        UpdateEmployeeModuleDto.employeeInfoId = resInfo["id"];

      } else {
        // ** update employee info currnt record
        await this.employeeInfoRepository.update({ id: +UpdateEmployeeModuleDto.employeeInfoId }, dataWithoutDoc);
      }
    }

    // ** get employee documents
    const documents = UpdateEmployeeModuleDto['filenames'];

    for (const item of documents) {
      let docType = '';
      if (item.hasOwnProperty("visaDoc") || item.hasOwnProperty("visaDoc[]")) {
        docType = "visaDoc";
      } else if (item.hasOwnProperty("empProvidedCopy") || item.hasOwnProperty("empProvidedCopy[]")) {
        docType = "empProvidedCopy";
      } else if (item.hasOwnProperty("officialDoc") || item.hasOwnProperty("officialDoc[]")) {
        docType = "officialDoc";
      } else if (item.hasOwnProperty("contractDoc") || item.hasOwnProperty("contractDoc[]")) {
        docType = "contractDoc";
      } else if (item.hasOwnProperty("offerLetterDoc") || item.hasOwnProperty("offerLetterDoc[]")) {
        docType = "offerLetterDoc";
      } else if (item.hasOwnProperty("refdoc") || item.hasOwnProperty("refdoc[]")) {
        docType = "refdoc";
      } else if (item.hasOwnProperty("drivingLicenceDoc") || item.hasOwnProperty("drivingLicenceDoc[]")) {
        docType = "drivingLicenceDoc";
      } else if (item.hasOwnProperty("tachoDoc") || item.hasOwnProperty("tachoDoc[]")) {
        docType = "tachoDoc";
      } else if (item.hasOwnProperty("cpcCardDoc") || item.hasOwnProperty("cpcCardDoc[]")) {
        docType = "cpcCardDoc";
      } else if (item.hasOwnProperty("crbCardDoc") || item.hasOwnProperty("crbCardDoc[]")) {
        docType = "crbCardDoc";
      }

      // ** deactivate previous documents
      this.employeeDocumentRepository
        .createQueryBuilder()
        .update(EmployeeDocument)
        .set({ active: 0 })
        .where('empid = :id', { id })
        .andWhere('docType = :docType', { docType })
        .execute();
    }

    // ** create employee document records
    if (documents.length > 0) {
      for (let document in documents) {
        const docEntry = documents[document];
        for (const doc in docEntry as {}) {
          const docType = doc;
          const docUrls = docEntry[doc]

          const empdocs = []
          for (const url in docUrls as {}) {
            empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +UpdateEmployeeModuleDto.employeeId, addedBy: data.addedBy })
          };
          await this.employeedocumentservice.create(empdocs)
          data = { ...data, [docType.replace('[]', '')]: empdocs }
        }
      }
    }

    // ** Find the previous history record of the employee
    const previousRecord = await this.employeedatahistoryrepo.findOne({
      where: {
        employeeId: +UpdateEmployeeModuleDto.employeeId,
        type: UpdateEmployeeModuleDto.type
      },
      order: { created_by: 'DESC' },
    });

    // ** If a previous record exists, update its endDate
    if (previousRecord) {
      previousRecord.updated_at = new Date(Date.now());
      previousRecord.updated_by = UpdateEmployeeModuleDto.created_by;
      await this.employeedatahistoryrepo.save(previousRecord);
    }

    delete UpdateEmployeeModuleDto.filenames;

    // ** create employee data history record
    if (employeeHistoryId) {
      await this.employeedatahistoryrepo.update({ id: employeeHistoryId }, { ...UpdateEmployeeModuleDto, data: JSON.stringify(data) });
    } else {
      const response = await this.employeedatahistoryrepo.create({ ...UpdateEmployeeModuleDto, data: JSON.stringify(data) });
      const res = await this.employeedatahistoryrepo.save(response);
    }
    

    // added by nuwan for mail send employeee password should be random generate one add random string
    // await this.mailservice.sendemailtoemployeeregistration(employeeemail,companyname,employeename,employeepassword,employeeusername)

    return await this.employeeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['documents']
    });

    // const query = `SELECT * FROM employee_module emp INNER JOIN employee_document doc ON emp.id = doc.empid WHERE emp.id = ${id} AND doc.active = 1;`;
    // const employeeTypeList = await this.connection.query(query);
    // return employeeTypeList;

    // return await this.employeeModuleRepository
    // .createQueryBuilder('employeeModule')
    // .leftJoinAndSelect('employeeModule.documents', 'documents')
    // .leftJoinAndSelect('documents.employee', 'employee')
    // .where('employeeModule.id = :id', { id })
    // .andWhere('documents.active = :isActive', { isActive: true })
    // .getOne();
  }

  remove(id: number) {
    return `This action removes a #${id} employeeModule`;
  }

  async find() {
    return await this.employeeInfoRepository.find({
      relations: ['drivingLicenceCategory', 'documents']
    });
  }

  // async findCompanyAllEmployees(companyid: number) {
  //   return await this.employeeInfoRepository.find({
  //     where: { company: companyid, status: 1 },
  //     relations: ['drivingLicenceCategory', 'employeeType', 'designation', 'company', 'gender', 'maritalStatus', 'drivingLicenceType', 'addedBy', 'addressCountry', 'refCompAddressCountry']
  //   });
  // }

  async deleteSheduleRecord(employeeHistoryId){
    const previousRecord = await this.employeedatahistoryrepo.findOne({
      where: {
        id: employeeHistoryId
      },
      relations: ['employeeInfoId']
    });    
    const employeeHistoryRecord = await this.employeedatahistoryrepo.update({ id: employeeHistoryId }, { status: false });
    const employeeInfoRecord = await this.employeeInfoRepository.update({ id: +previousRecord?.['employeeInfoId']?.['id'] }, { status: false });

    return { employeeHistoryRecord, employeeInfoRecord}
  }

  async findCompanyAllEmployees(companyid: number) {
    const date = new Date();
    const query: SelectQueryBuilder<Employee> = getConnection()
      .getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.company", "company")
      // .leftJoinAndSelect("employee.documents", "documents")
      .leftJoinAndSelect("employee.linkedEmployee", "linkedEmployee")
      .leftJoinAndSelect("linkedEmployee.employeeType", "employeeType")
      .leftJoinAndSelect("linkedEmployee.designation", "designation")
      .leftJoinAndSelect("linkedEmployee.gender", "gender")
      .leftJoinAndSelect("linkedEmployee.maritalStatus", "maritalStatus")
      .leftJoinAndSelect("linkedEmployee.drivingLicenceType", "drivingLicenceType")
      .leftJoinAndSelect("linkedEmployee.visaType", "visaType")
      .leftJoinAndSelect("linkedEmployee.created_by", "created_by")
      .leftJoinAndSelect("linkedEmployee.addressCountry", "addressCountry")
      .leftJoinAndSelect("linkedEmployee.refCompAddressCountry", "refCompAddressCountry")
      .andWhere("linkedEmployee.startDate <= :date", { date })
      .andWhere("linkedEmployee.status = :status", { status: 1 })
      .andWhere("company.id = :companyid", { companyid })
      .andWhere(
        "(linkedEmployee.end_date IS NULL OR linkedEmployee.end_date > :date)",
        { date }
      );

    const data = await query.getMany();

    const newdata = [];

    for (var i = 0; i < data.length; i++) {
      let passdata = {}
      const { linkedEmployee, ...mainEmployeeData } = data[i];
      const companyData = await this.companyservice.read(mainEmployeeData?.company?.id);
      passdata = {
        ...linkedEmployee[0],
        id: mainEmployeeData.id,
        employeeCode: mainEmployeeData.employeeCode,
        company: companyData,
      }
      newdata.push(passdata)
    }

    return newdata;
  }

  // async findCompanyAllEmployeesWithDoc(companyid: number) {
  //   return await this.employeeInfoRepository.find({
  //     where: { company: companyid, status: 1 },
  //     relations: ['documents', 'employeeType']
  //   });
  // }

  async findCompanyAllEmployeesWithDoc(companyid: number) {
    const date = new Date();
    const query: SelectQueryBuilder<Employee> = getConnection()
      .getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.company", "company")
      // .leftJoinAndSelect("employee.documents", "documents")
      .leftJoinAndSelect("employee.linkedEmployee", "linkedEmployee")
      .leftJoinAndSelect("linkedEmployee.employeeType", "employeeType")
      .leftJoinAndSelect("linkedEmployee.designation", "designation")
      .leftJoinAndSelect("linkedEmployee.gender", "gender")
      .leftJoinAndSelect("linkedEmployee.maritalStatus", "maritalStatus")
      .leftJoinAndSelect("linkedEmployee.drivingLicenceType", "drivingLicenceType")
      .leftJoinAndSelect("linkedEmployee.visaType", "visaType")
      .leftJoinAndSelect("linkedEmployee.created_by", "created_by")
      .leftJoinAndSelect("linkedEmployee.addressCountry", "addressCountry")
      .leftJoinAndSelect("linkedEmployee.refCompAddressCountry", "refCompAddressCountry")
      .andWhere("linkedEmployee.start_date <= :date", { date })
      .andWhere("linkedEmployee.status = :status", { status: 1 })
      .andWhere("linkedEmployee.company = :companyid", { companyid })
      .andWhere(
        "(linkedEmployee.end_date IS NULL OR linkedEmployee.end_date > :date)",
        { date }
      );

    const data = await query.getMany();
    const newdata = [];

    for (var i = 0; i < data.length; i++) {
      let passdata = {}
      const { linkedEmployee, ...mainEmployeeData } = data[i];
      const companyData = await this.companyservice.read(mainEmployeeData?.company?.id);
      passdata = {
        ...linkedEmployee[0],
        id: mainEmployeeData.id,
        employeeCode: mainEmployeeData.employeeCode,
        company: companyData
      }
      newdata.push(passdata)
    }

    return newdata;
  }

  async generateTemporaryNumber(gender, birthday) {
    const year = birthday.getFullYear().toString().slice(-2);
    const month = (birthday.getMonth() + 1).toString().padStart(2, '0');
    const day = birthday.getDate().toString().padStart(2, '0');

    // Format the temporary number
    const temporaryNumber = `TN${day}${month}${year}${gender.toUpperCase()}`;

    return temporaryNumber;
  }
}
