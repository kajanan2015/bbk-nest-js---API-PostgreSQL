import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDefectCaseDto } from './create-defect-case.dto';
import { UpdateDefectCaseDto } from './update-defect-case.dto';
import { defectCases } from './defect-case.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DefectCasesService {
  constructor(
    @InjectRepository(defectCases)
    private defectCaseRepository: Repository<defectCases>
  ) {}
  async create(createDefectCaseDto: CreateDefectCaseDto) {
    const response=this.defectCaseRepository.create(createDefectCaseDto);
    return await this.defectCaseRepository.save(response);
  }

  async findAll() {
    return await this.defectCaseRepository.find({ 
      where: { status: 1 }, 
    });
  }

 async findOne(id: number) {
    const defectCaseFind = await this.defectCaseRepository.findOne(id);
    if (!defectCaseFind) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return defectCaseFind;
  }

  async update(id: number, updateDefectCaseDto: UpdateDefectCaseDto) {
    await this.defectCaseRepository.update({ id }, updateDefectCaseDto);
    return await this.defectCaseRepository.findOne({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} defectCase`;
  }
}
