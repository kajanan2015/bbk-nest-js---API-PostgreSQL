import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFramelayoutDto } from './create-framelayout.dto';
import { UpdateFramelayoutDto } from './update-framelayout.dto';
import { Framelayout } from './framelayout.entity';
@Injectable()
export class FramelayoutService {
  constructor(
    @InjectRepository(Framelayout)
    private framelayoutRepository: Repository<Framelayout>,
  ) {}
  
  async showAll() {
    return await this.framelayoutRepository.find();
  }

  async create(data) {
    const company = this.framelayoutRepository.create(data);
    await this.framelayoutRepository.save(data);
    return company;
  }

  async findById(id: number): Promise<CreateFramelayoutDto> {
    return await this.framelayoutRepository.findOne({ id });
  }

  
  
  async read(type: string) {
    return await this.framelayoutRepository.findOne({ where: { vtype: type } });
  }

  async update(id: number, data: Partial<CreateFramelayoutDto>) {
    await this.framelayoutRepository.update({ id }, data);
    return await this.framelayoutRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.framelayoutRepository.delete({ id });
    return { deleted: true };
  }
}
