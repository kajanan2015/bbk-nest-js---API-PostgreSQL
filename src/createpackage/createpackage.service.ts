import { Injectable } from '@nestjs/common';
import { CreateCreatepackageDto } from './create-createpackage.dto';
import { UpdateCreatepackageDto } from './update-createpackage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Createpackage } from './createpackage.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CreatepackageService {
  constructor(
    @InjectRepository(Createpackage)
    private createpkgRepository: Repository<Createpackage>,
  ) {}
 async create(data) {
    const response=this.createpkgRepository.create(data);
    return await this.createpkgRepository.save(response);
  }

  async findAll() {
    return await this.createpkgRepository.find({ 
      where: { status: 1 },relations:['modules','modules.details','modules.details.moduledata'] 
    });
  }

 async findOne(id: number) {
    return `This action returns a #${id} createpackage`;
  }

 async update(id: number, updateCreatepackageDto: UpdateCreatepackageDto) {
    return `This action updates a #${id} createpackage`;
  }

 async remove(id: number) {
    return `This action removes a #${id} createpackage`;
  }
}
