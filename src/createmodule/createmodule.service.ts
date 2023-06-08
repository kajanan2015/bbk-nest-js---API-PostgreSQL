import { Injectable } from '@nestjs/common';
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
  async create(createCreatemoduleDto: CreateCreatemoduleDto) {
    const response=this.createmoduleRepository.create(createCreatemoduleDto);
    return await this.createmoduleRepository.save(response);
  }

  async findAll() {
    return await this.createmoduleRepository.find();
  }

  async findOne(id: number) {
    return await this.createmoduleRepository.find({where:{id}});
  }

  async update(id: number, updateCreatemoduleDto: UpdateCreatemoduleDto) {
    return `This action updates a #${id} createmodule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} createmodule`;
  }
}
