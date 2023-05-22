import { Injectable } from '@nestjs/common';
import { CreateFramelayoutDto } from './create-framelayout.dto';
import { UpdateFramelayoutDto } from './update-framelayout.dto';

@Injectable()
export class FramelayoutService {
  create(createFramelayoutDto: CreateFramelayoutDto) {
    return 'This action adds a new framelayout';
  }

  findAll() {
    return `This action returns all framelayout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} framelayout`;
  }

  update(id: number, updateFramelayoutDto: UpdateFramelayoutDto) {
    return `This action updates a #${id} framelayout`;
  }

  remove(id: number) {
    return `This action removes a #${id} framelayout`;
  }
}
