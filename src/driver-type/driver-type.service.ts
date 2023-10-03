import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverTypeEntity } from './driver-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverTypeService {
  constructor(
    @InjectRepository(DriverTypeEntity)
    private driverTypeRepository: Repository<DriverTypeEntity>,
  ) {}
  
  async findAll(): Promise<DriverTypeEntity[]> {
    return this.driverTypeRepository.find();
  }

  async findOne(id: number): Promise<DriverTypeEntity> {
    return this.driverTypeRepository.findOne(id);
  }
}
