import { Injectable } from '@nestjs/common';
import { CreateDefectCaseDto } from './dto/create-defect-case.dto';
import { UpdateDefectCaseDto } from './dto/update-defect-case.dto';

@Injectable()
export class DefectCasesService {
  create(createDefectCaseDto: CreateDefectCaseDto) {
    return 'This action adds a new defectCase';
  }

  findAll() {
    return `This action returns all defectCases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defectCase`;
  }

  update(id: number, updateDefectCaseDto: UpdateDefectCaseDto) {
    return `This action updates a #${id} defectCase`;
  }

  remove(id: number) {
    return `This action removes a #${id} defectCase`;
  }
}
