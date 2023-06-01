import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeDocumentService } from 'src/employee-document/employee-document.service';

// import randomstring from 'randomstring';
const randomstring = require("randomstring");

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(EmployeeModule)
    private employeeModuleRepository: Repository<EmployeeModule>,
    private readonly connection: Connection,
    private readonly employeedocumentservice: EmployeeDocumentService,
    ) {}

  async create(createEmployeeModuleDto ) {
    const existingEmployee = await this.employeeModuleRepository.findOne({where:{employeeId:createEmployeeModuleDto.employeeId}});
     if (existingEmployee) {
      const {providedCopyUrl, profilePicUrl, ...dataWithouturl } = createEmployeeModuleDto;
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

  async generateemployeeid(){
    let randomId = randomstring.generate(10);
    let response = await this.employeeModuleRepository.find({ where: { employeeId: randomId } });

    while (response.length > 0) {
      randomId = randomstring.generate(10);
      response = await this.employeeModuleRepository.find({ where: { employeeId: randomId } });
    }

    return randomId;


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
      
 
    
    const employeerowid=await this.employeeModuleRepository.findOne({where:{employeeId:id}});
    
      const documentUpload = data['filenames'];
      const files = documentUpload.map(documentPath => ({ documentPath, empid: +employeerowid.id }));
      await this.employeedocumentservice.create(files)
      delete data['filenames'];
    
    await this.employeeModuleRepository.update({id:+employeerowid.id}, data);
    return await this.employeeModuleRepository.findOne({id:employeerowid.id});
  }

  remove(id: number) {
    return `This action removes a #${id} employeeModule`;
  }
  
  async findAll() {
    return await this.employeeModuleRepository.find();
  }
}
