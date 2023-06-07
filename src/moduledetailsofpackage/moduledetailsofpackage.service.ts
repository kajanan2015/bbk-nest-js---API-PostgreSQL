import { Injectable } from '@nestjs/common';
import { CreateModuledetailsofpackageDto } from './create-moduledetailsofpackage.dto';
import { UpdateModuledetailsofpackageDto } from './update-moduledetailsofpackage.dto';
import { Moduledetailsofpackage } from './moduledetailsofpackage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ModuledetailsofpackageService {
  constructor(
    @InjectRepository(Moduledetailsofpackage)
    private createpkgmoduledetailsRepository: Repository<Moduledetailsofpackage>,
  ) {}
async  create(createModuledetailsofpackageDto: CreateModuledetailsofpackageDto) {
    const response=this.createpkgmoduledetailsRepository.create(createModuledetailsofpackageDto);
    return await this.createpkgmoduledetailsRepository.save(response);
  }

  async findAll() {
    return await this.createpkgmoduledetailsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} moduledetailsofpackage`;
  }

  update(id: number, updateModuledetailsofpackageDto: UpdateModuledetailsofpackageDto) {
    return `This action updates a #${id} moduledetailsofpackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduledetailsofpackage`;
  }
}
