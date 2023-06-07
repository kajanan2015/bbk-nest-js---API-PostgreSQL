import { Injectable } from '@nestjs/common';
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
    const response=this.createpkgRepository.create(data);
    const packageresponse = await this.createpkgRepository.save(response);
  let detailsdata;
    for (const value of data.details) {
      detailsdata={
        ...value,
        package:packageresponse['id']
      }
      await this.moduledetailspackageservice.create(detailsdata)  
    }
    
    return await this.createpkgRepository.find({ 
      where: { status: 1 } 
    })
  }

  async findAll() {
    return await this.createpkgRepository.find({ 
      where: { status: 1 } 
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
