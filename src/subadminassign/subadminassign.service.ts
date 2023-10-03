import { Injectable } from '@nestjs/common';
import { CreateSubadminassignDto } from './create-subadminassign.dto';
import { UpdateSubadminassignDto } from './update-subadminassign.dto';

@Injectable()
export class SubadminassignService {
  create(createSubadminassignDto: CreateSubadminassignDto) {
    return 'This action adds a new subadminassign';
  }

  findAll() {
    return `This action returns all subadminassign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subadminassign`;
  }

  update(id: number, updateSubadminassignDto: UpdateSubadminassignDto) {
    return `This action updates a #${id} subadminassign`;
  }

  remove(id: number) {
    return `This action removes a #${id} subadminassign`;
  }
}
