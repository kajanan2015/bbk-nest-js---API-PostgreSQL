import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCreatemoduleDto } from './create-createmodule.dto';
import { UpdateCreatemoduleDto } from './update-createmodule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Createmodule } from './createmodule.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CreatemoduleService {
  constructor(
    @InjectRepository(Createmodule)
    private createmoduleRepository: Repository<Createmodule>,
  ) {}
  async create(createCreatemoduleDto) {
    const response=this.createmoduleRepository.create(createCreatemoduleDto);
    const saveresponse= await this.createmoduleRepository.save(response);
  if(saveresponse.length>0){
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
    return await this.createmoduleRepository.find({relations:['moduleupdate','modulecreate','company']});
  }

  async findOne(id: number) {
    return await this.createmoduleRepository.find({where:{id},relations:['moduleupdate','modulecreate','company']});
  }

  async update(id: number, updateCreatemoduleDto) {
    const updateresponse=await this.createmoduleRepository.update({ id }, updateCreatemoduleDto);
    
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
    return `This action removes a #${id} createmodule`;
  }
}
