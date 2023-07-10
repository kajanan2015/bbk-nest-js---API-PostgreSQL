import { HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
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
// import randomstring from 'randomstring';
const randomstring = require("randomstring");

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(EmployeeModule)
    private employeeModuleRepository: Repository<EmployeeModule>,
    private readonly connection: Connection,
    private readonly employeedocumentservice: EmployeeDocumentService,
    private companyservice: CompaniesService,
    private readonly imageUploadService: ImageUploadService,
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
    @InjectRepository(DrivingLicenceType)
    private readonly dlTypeRepository: Repository<DrivingLicenceType>,
    @InjectRepository(PaymentFrequency)
    private readonly paymentFreqRepository: Repository<PaymentFrequency>,
    @InjectRepository(DrivingLicenceCategory)
    private readonly dlCategoryRepository: Repository<DrivingLicenceCategory>,
  ) { }

  async create(createEmployeeModuleDto) {
    const existingEmployee = await this.employeeModuleRepository.findOne({ where: { employeeId: createEmployeeModuleDto.employeeId } });
    if (existingEmployee) {
      const { providedCopyUrl, empProvidedCopyUrl, filenames, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
      const data = {
        ...dataWithouturl
      }

      const documents = createEmployeeModuleDto['filenames'];
      const res = await this.employeeModuleRepository.update({ id: existingEmployee.id }, data);

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
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee['id'] })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +existingEmployee['id'] })
              };
              await this.employeedocumentservice.create(empdocs)
            }

          }
        }
      }

      return await this.employeeModuleRepository.findOne({
        where: { id: existingEmployee.id },
        relations: ['drivingLicenceCategory', 'documents']
      });

    } else {
      const existingEmployee = await this.employeeModuleRepository.findOne({ where: { email: createEmployeeModuleDto.email, company: createEmployeeModuleDto.company } });

      if (existingEmployee) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: "User already exists!",
        };
      }

      const { providedCopyUrl, empProvidedCopyUrl, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
      const response = await this.employeeModuleRepository.create(dataWithouturl);
      const res = await this.employeeModuleRepository.save(response);

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
        email: createEmployeeModuleDto.employeeId,
        activate: 1,
        activated_time: currentDateTime
      };

      const adminResponse = await this.userservice.create(employeeaccountcreationdata);

      // added for send email and password to the user 
      await this.mailservice.sendemailtoemployeeregistration(createEmployeeModuleDto.email, "ABC", createEmployeeModuleDto.firstName, employeerandompassword, createEmployeeModuleDto.employeeId)


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
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +res['id'] })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +res['id'] })
              };
              await this.employeedocumentservice.create(empdocs)
            }

          }
        }
      }
      return await this.employeeModuleRepository.findOne({
        where: { employeeId: createEmployeeModuleDto.employeeId },
        relations: ['drivingLicenceCategory', 'documents']
      });
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
    let newrandomId = individualcompany.code + '-' + randomId;;
    let response = await this.employeeModuleRepository.find({ where: { employeeId: newrandomId } });

    while (response.length > 0) {
      randomId = randomstring.generate({
        length: 7,
        charset: 'numeric'
      });
      newrandomId = individualcompany.code + '-' + randomId;
      response = await this.employeeModuleRepository.find({ where: { employeeId: newrandomId } });
    }
    return newrandomId;
  }

  async findById(id: number) {
    return await this.employeeModuleRepository.findOne({
      where: { id: +id },
      relations: ['drivingLicenceCategory', 'documents', 'drivingLicenceType', 'employeeType', 'addedBy', 'designation', 'company', 'gender', 'maritalStatus', 'bankName', 'paymentFrequency', 'addressCountry', 'refCompAddressCountry']
    });
  }

  // async update(id: number, UpdateEmployeeModuleDto: UpdateEmployeeModuleDto) {
  //   await this.employeeModuleRepository.update({ id }, UpdateEmployeeModuleDto);
  //   return await this.employeeModuleRepository.findOne({ id });
  // }
  async update(id: string, UpdateEmployeeModuleDto: Partial<EmployeeModule>) {
    const data = {
      ...UpdateEmployeeModuleDto
    }

    const employeerowid = await this.employeeModuleRepository.findOne({ where: { employeeId: id }, relations: ['drivingLicenceCategory'] });
    if (data.hasOwnProperty("drivingLicenceCategory")) {
      const drivingLicenceCategories = data.drivingLicenceCategory;
      let drivinglicensecategoryId = [];
      for (const categoryid of data.drivingLicenceCategory) {
        drivinglicensecategoryId.push(categoryid.id)
      }
      console.log(drivinglicensecategoryId, 5654)
      const repsonse1 = await this.drivingLicenceCategoryRepository.findByIds(drivinglicensecategoryId)
      employeerowid.drivingLicenceCategory = repsonse1;
      const response3333 = await this.employeeModuleRepository.save(employeerowid)

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
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'empProvidedCopy')
            } else if (docType == "officialDoc[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'officialDoc')
            } else if (docType == "visaDoc[]") {
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'visaDoc')
            }
            if (empExsistDocRow) {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +employeerowid.id })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            } else {
              const empdocs = []
              for (const url in docUrls as {}) {
                empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +employeerowid.id })
              };
              await this.employeedocumentservice.create(empdocs)
            }
          } else if (docType == "contractDoc[]" || docType == "offerLetterDoc[]" ||
            docType == "refdoc[]" || docType == "drivingLicenceDoc[]" || docType == "tachoDoc[]"
            || docType == "cpcCardDoc[]" || docType == "crbCardDoc[]") {
            console.log(docType)
            const empdocs = []
            for (const url in docUrls as {}) {
              empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +employeerowid.id })
            };
            await this.employeedocumentservice.create(empdocs)
          } else {
            const empdocs = []
            for (const url in docUrls as {}) {
              empdocs.push({ docType: docType.replace('[]', ''), description: 'additional', docPath: docUrls[url], empid: +employeerowid.id })
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

    await this.employeeModuleRepository.update({ id: +employeerowid.id }, data);

    const updatedEmployee = await this.employeeModuleRepository.findOne({
      where: { id: employeerowid.id }
    });

    if (updatedEmployee.isNonNative != null && updatedEmployee.bankAccountNo != null && updatedEmployee.salaryType != null) {
      await this.employeeModuleRepository.update({ id: +employeerowid.id }, { active: true });
    }
    return await this.employeeModuleRepository.findOne({
      where: { id: employeerowid.id },
      relations: ['drivingLicenceCategory', 'documents']
    });
  }

  async updateWithHistory(id: string, UpdateEmployeeModuleDto) {

    let data = {
      ...UpdateEmployeeModuleDto.data
    }

    let { visaDoc, tachoDoc, officialDoc, drivingLicenceDoc, cpcCardDoc, refdoc, empProvidedCopy, ...dataWithoutDoc } = data

    const employeerowid = await this.employeeModuleRepository.findOne({ where: { id: id } });

    await this.employeeModuleRepository.update({ id: +id }, dataWithoutDoc);

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

      this.employeeDocumentRepository
        .createQueryBuilder()
        .update(EmployeeDocument)
        .set({ active: 0 })
        .where('empid = :id', { id })
        .andWhere('docType = :docType', { docType })
        .execute();
    }

    if (documents.length > 0) {
      for (let document in documents) {
        const docEntry = documents[document];
        for (const doc in docEntry as {}) {
          const docType = doc;
          const docUrls = docEntry[doc]

          const empdocs = []
          for (const url in docUrls as {}) {
            empdocs.push({ docType: docType.replace('[]', ''), docPath: docUrls[url], empid: +employeerowid.id })
          };
          await this.employeedocumentservice.create(empdocs)
          data = { ...data, [docType.replace('[]', '')]: empdocs }

        }
      }
    }

    // Find the previous record of the employee
    const previousRecord = await this.employeedatahistoryrepo.findOne({
      where: {
        employee: +UpdateEmployeeModuleDto.employee,
        type: UpdateEmployeeModuleDto.type
      },
      order: { createdBy: 'DESC' },
    });

    // If a previous record exists, update its endDate
    if (previousRecord) {
      previousRecord.endDate = new Date(Date.now());
      previousRecord.editedBy = UpdateEmployeeModuleDto.createdBy;
      await this.employeedatahistoryrepo.save(previousRecord);
    }

    const response = await this.employeedatahistoryrepo.create({ ...UpdateEmployeeModuleDto, data: JSON.stringify(data) });
    const res = await this.employeedatahistoryrepo.save(response);

    // added by nuwan for mail send employeee password should be random generate one add random string
    // await this.mailservice.sendemailtoemployeeregistration(employeeemail,companyname,employeename,employeepassword,employeeusername)

    return await this.employeeModuleRepository.findOne({
      where: {
        id: id,
      },
      relations: ['drivingLicenceCategory', 'documents']
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
    return await this.employeeModuleRepository.find({
      relations: ['drivingLicenceCategory', 'documents']
    });
  }

  async findCompanyAllEmployees(companyid: number) {
    return await this.employeeModuleRepository.find({
      where: { company: companyid, status: 1 },
      relations: ['drivingLicenceCategory', 'employeeType', 'designation', 'company', 'gender', 'maritalStatus', 'drivingLicenceType', 'addedBy', 'addressCountry', 'refCompAddressCountry']
    });
  }

  async findCompanyAllEmployeesWithDoc(companyid: number) {
    return await this.employeeModuleRepository.find({
      where: { company: companyid, status: 1 },
      relations: ['documents', 'employeeType']
    });
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
