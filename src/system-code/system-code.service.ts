import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSystemCodeDto } from './create-system-code.dto';
import { UpdateSystemCodeDto } from './update-system-code.dto';
import { SystemCode } from './system-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SystemCodeService {
  constructor(
    @InjectRepository(SystemCode)
    private systemCodeRepository: Repository<SystemCode>,
  ) {}
  async create(createSystemCodeDto: CreateSystemCodeDto) {
    const response=this.systemCodeRepository.create(createSystemCodeDto);
    return await this.systemCodeRepository.save(response);
  }

  async findAll() {
    return await this.systemCodeRepository.find({ 
      where: { status: 1 }, 
    });
  }

  async findOne(purpose: string) {
    const systemcode = await this.systemCodeRepository.findOne({ 
      where: { purpose: purpose }, 
    });
    if (!systemcode) {
      throw new NotFoundException(` purpose '${purpose}' not found`);
    }
    return systemcode;
  }

  async update(id: number, updateSystemCodeDto: UpdateSystemCodeDto) {
    await this.systemCodeRepository.update({ id }, updateSystemCodeDto);
    return await this.systemCodeRepository.findOne({ id });

  }

  remove(id: number) {
    return `This action removes a #${id} systemCode`;
  }
}
