import { Injectable } from '@nestjs/common';
import { CreateDefectCasesResultDto } from './create-defect-cases-result.dto';
import { UpdateDefectCasesResultDto } from './update-defect-cases-result.dto';

@Injectable()
export class DefectCasesResultService {
  create(createDefectCasesResultDto: CreateDefectCasesResultDto) {
    return 'This action adds a new defectCasesResult';
  }

  findAll() {
    return `This action returns all defectCasesResult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defectCasesResult`;
  }

  update(id: number, updateDefectCasesResultDto: UpdateDefectCasesResultDto) {
    return `This action updates a #${id} defectCasesResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} defectCasesResult`;
  }
}
