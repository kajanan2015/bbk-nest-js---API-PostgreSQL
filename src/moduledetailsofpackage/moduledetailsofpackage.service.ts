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
async  create(createModuledetailsofpackageDto) {
    const response=this.createpkgmoduledetailsRepository.create(createModuledetailsofpackageDto);
    return await this.createpkgmoduledetailsRepository.save(response);
  }

  async findAll() {
    return await this.createpkgmoduledetailsRepository.find();
  }

  async findOne(id: number) {
    const packages= await this.createpkgmoduledetailsRepository.find({where:{module:id},relations:['packages']});
    const filteredPackages = packages.filter((packagepass) => packagepass.packages.status === 1);
return filteredPackages;
  }

  async update(id: number, data) {
    await this.createpkgmoduledetailsRepository.update({ id }, data);
  }

  async remove(id: number) {
    await this.createpkgmoduledetailsRepository.delete({ id });
      return { deleted: true };
  }
}
