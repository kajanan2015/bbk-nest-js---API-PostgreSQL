import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';
import { CompaniesService } from 'src/companies/companies.service';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
// import randomstring from 'randomstring';
const randomstring = require("randomstring");

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(EmployeeModule)
    private employeeModuleRepository: Repository<EmployeeModule>,
    private readonly connection: Connection,
    private readonly employeedocumentservice: EmployeeDocumentService,    
    private  companyservice:CompaniesService,
    private readonly imageUploadService: ImageUploadService,
    @InjectRepository(EmployeeDocument)
    private employeeDocumentRepository: Repository<EmployeeDocument>,
    ) {}

  async create(createEmployeeModuleDto ) {
    const existingEmployee = await this.employeeModuleRepository.findOne({where:{employeeId:createEmployeeModuleDto.employeeId}});
     if (existingEmployee) {
      const {providedCopyUrl, empProvidedCopyUrl, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
      const data={
        ...dataWithouturl
      }
      const response = await this.employeeModuleRepository.update({id:existingEmployee.id}, data);

      return await this.employeeModuleRepository.findOne({id:existingEmployee.id});
     }else {
      const response=this.employeeModuleRepository.create(createEmployeeModuleDto);
      await this.employeeModuleRepository.save(response);
      return response;
     }  
  }

  async getGender(){
    const query = 'SELECT * FROM `gender`';
    const genderList = await this.connection.query(query);
    return genderList;
  }
  async getEmployeeType(){
    const query = 'SELECT * FROM `EmployeeType`';
    const employeeTypeList = await this.connection.query(query);
    return employeeTypeList;
  }
  async getDesignation(){
    const query = 'SELECT * FROM `employeeDesignation`';
    const designationList = await this.connection.query(query);
    return designationList;
  }
  async getCompany(){
    const query = 'SELECT * FROM `company`';
    const companyList = await this.connection.query(query);
    return companyList;
  }

  async getMaritalStatus(){
    const query = 'SELECT * FROM `marital_status`';
    const maritalStatusList = await this.connection.query(query);
    return maritalStatusList;
  }

  async getDrivingLicenceType() {
    const query = 'SELECT * FROM `driving_licence_type`';
    const drivingLicenceTypeList = await this.connection.query(query);
    return drivingLicenceTypeList;
  }

  async getPaymentFrequency() {
    const query = 'SELECT * FROM `payment_frequency`';
    const paymentFrequencyTypeList = await this.connection.query(query);
    return paymentFrequencyTypeList;
  }

  async getBank() {
    const query = 'SELECT * FROM `bank`';
    const bankTypeList = await this.connection.query(query);
    return bankTypeList;
  }

  async generateemployeeid(id){
    const individualcompany=await this.companyservice.read(id)
    let randomId = randomstring.generate(7);
    let newrandomId=individualcompany.code+'-'+randomId;;
    let response = await this.employeeModuleRepository.find({ where: { employeeId: newrandomId } });

    while (response.length > 0) {
      randomId = randomstring.generate(7);
      newrandomId=individualcompany.code+'-'+randomId;
      response = await this.employeeModuleRepository.find({ where: { employeeId: newrandomId } });
    }
    return newrandomId;
  }

 async findById(id: number) {
    return await this.employeeModuleRepository.findOne({id});
  }

  // async update(id: number, UpdateEmployeeModuleDto: UpdateEmployeeModuleDto) {
  //   await this.employeeModuleRepository.update({ id }, UpdateEmployeeModuleDto);
  //   return await this.employeeModuleRepository.findOne({ id });
  // }
  async update(id:string, UpdateEmployeeModuleDto: Partial<EmployeeModule>) {
    const data={
      ...UpdateEmployeeModuleDto
    }
   
      // for (const filename of data['filenames']) {
      //   if (filename['empProvidedCopy[]']) {
      //     data.empProvidedCopy = filename[0]['empProvidedCopy[]'][0];
      //     data.empProvidedCopyThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['empProvidedCopy[]'][0]);
      //   }
      // }

    const employeerowid = await this.employeeModuleRepository.findOne({where:{employeeId:id}});
    
    const documents = data['filenames'];
    if(documents.length>0){
     for(let document in documents){      
      const docEntry = documents[document];
      for(const doc in docEntry as {}){
          const docType  = doc;
          const docUrls = docEntry[doc]
          if(docType == "visaDoc[]" || docType == "empProvidedCopy[]" || docType == "officialDoc[]"){
            let empExsistDocRow;
            if(docType == "empProvidedCopy[]"){
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'empProvidedCopy' )        
            }else if(docType == "officialDoc[]"){
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'officialDoc' )          
            }else if(docType == "visaDoc[]"){
              empExsistDocRow = await this.employeedocumentservice.findOne(+employeerowid.id, 'visaDoc' )           
            }
            if(empExsistDocRow){
              const empdocs = [] 
              for(const url in docUrls as {}){
                empdocs.push({ docType: docType.replace('[]',''), docPath:docUrls[url], empid: +employeerowid.id })
              };
              await this.employeedocumentservice.update(+empExsistDocRow.id, empdocs[0])
            }else{
              const empdocs = [] 
              for(const url in docUrls as {}){
                empdocs.push({ docType: docType.replace('[]',''), docPath:docUrls[url], empid: +employeerowid.id })
              };
              await this.employeedocumentservice.create(empdocs)
            }            
          }else if(docType == "contractDoc[]" || docType == "offerLetterDoc[]" || 
              docType == "refdoc[]" || docType == "drivingLicenceDoc[]" || docType == "tachoDoc[]" 
              || docType == "cpcCardDoc[]" || docType == "crbCardDoc[]"){
                console.log(docType)
              const empdocs = []
              for(const url in docUrls as {}){
                empdocs.push({ docType: docType.replace('[]',''), docPath:docUrls[url], empid: +employeerowid.id })
              };
              await this.employeedocumentservice.create(empdocs)       
          }else{
            const empdocs = []
              for(const url in docUrls as {}){
                empdocs.push({ docType: docType.replace('[]',''), description:'additional', docPath:docUrls[url], empid: +employeerowid.id })
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
    await this.employeeModuleRepository.update({id:+employeerowid.id}, data);
    return await this.employeeModuleRepository.findOne({
      where: {id:employeerowid.id},
      relations: ['documents']
    });
  }

  remove(id: number) {
    return `This action removes a #${id} employeeModule`;
  }

  async find(){
    return await this.employeeModuleRepository.find({    
      relations: ['documents']
    });
  }
  
  async findCompanyAllEmployees(companyid: number) {
    return await this.employeeModuleRepository.find({
      where: {company: companyid},
      relations: ['employeeType', 'designation', 'company']
    });
  }

  async generateTemporaryNumber(gender,birthday){
    const year = birthday.getFullYear().toString().slice(-2);
    const month = (birthday.getMonth() + 1).toString().padStart(2, '0');
    const day = birthday.getDate().toString().padStart(2, '0');

    // Format the temporary number
    const temporaryNumber = `TN${day}${month}${year}${gender.toUpperCase()}`;

    return temporaryNumber;
  }
}
