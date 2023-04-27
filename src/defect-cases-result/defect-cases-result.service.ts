import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDefectCasesResultDto } from './create-defect-cases-result.dto';
import { UpdateDefectCasesResultDto } from './update-defect-cases-result.dto';
import { DefectCasesResult } from './defect-cases-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DefectCasesResultService {
  constructor(
    @InjectRepository(DefectCasesResult)
    private defectripresult: Repository<DefectCasesResult>
  ) {}
  async create(createDefectCasesResultDto: CreateDefectCasesResultDto) {
    const response=this.defectripresult.create(createDefectCasesResultDto);
    return await this.defectripresult.save(response);
  }

 async  findAll() {
    return await this.defectripresult.find({ 
      where: { status: 1 }, 
    });
  }

  async findOne(id: number) {
    const defecttrip = await this.defectripresult.findOne(id);
    if (!defecttrip) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return defecttrip;
  
  }

  async update(id: number, updateDefectCasesResultDto: UpdateDefectCasesResultDto) {
    await this.defectripresult.update({ id }, updateDefectCasesResultDto);
    return await this.defectripresult.findOne({ id });
  }

 async  remove(id: number) {
    return `This action removes a #${id} defectCasesResult`;
  }
}
