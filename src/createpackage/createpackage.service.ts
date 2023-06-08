import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreatepackageDto } from './create-createpackage.dto';
import { UpdateCreatepackageDto } from './update-createpackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Createpackage } from './createpackage.entity';
import { Repository } from 'typeorm';
import { ModuledetailsofpackageService } from 'src/moduledetailsofpackage/moduledetailsofpackage.service';
@Injectable()
export class CreatepackageService {
  constructor(
    @InjectRepository(Createpackage)
    private createpkgRepository: Repository<Createpackage>,
    private readonly moduledetailspackageservice: ModuledetailsofpackageService,
  ) {}
 async create(data) {
  console.log(data,77)
    const response=this.createpkgRepository.create(data);
    console.log(response,22)
    const packageresponse = await this.createpkgRepository.save(response);
    console.log(packageresponse['id'],66)
  let detailsdata;
    for (const value of data.modules) {
      console.log(value.details,66789)
      detailsdata={
        module:value.details.id,
        packages:packageresponse['id'],
        NoOfRecords:value.details.noOfRecords,
        CostPerRecord:value.details.costPerRecord,
        PackagePrice:value.details.packagePrice,
      }
      console.log(detailsdata,8998)
      await this.moduledetailspackageservice.create(detailsdata)  
    }
    if(packageresponse.length>0){
      return {
        statusCode: HttpStatus.OK,
        message:"successs"
      };
    }else{
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message:"failed"
      };
    }
    
  }

  async findAll() {
    return await this.createpkgRepository.find({ 
      where: { status: 1 },relations:['packagedetails','packagedetails.module','pkgcreate','pkgupdate','company'] 
    });
  }

 async findOne(id: number) {
  const packagedata = await this.createpkgRepository.findOne(id,{relations:['packagedetails','packagedetails.module','pkgcreate','pkgupdate','company']});
  if (!packagedata) {
    throw new NotFoundException(` ID '${id}' not found`);
  }
  return packagedata;
  }

 async update(id: number, updateCreatepackageDto) {
  const updateresponse=await this.createpkgRepository.update({ id }, updateCreatepackageDto);
    
  if(updateresponse){
    return {
      statusCode: HttpStatus.OK,
      message:"successs"
    };
  }else{
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message:"failed"
    };
  }
  }

 async remove(id: number) {
    return `This action removes a #${id} createpackage`;
  }
}
