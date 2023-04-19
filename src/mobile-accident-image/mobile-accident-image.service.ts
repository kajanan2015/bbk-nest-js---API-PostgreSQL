import { Injectable } from '@nestjs/common';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';

@Injectable()
export class MobileAccidentImageService {
  create(createMobileAccidentImageDto: CreateMobileAccidentImageDto) {
    return 'This action adds a new mobileAccidentImage';
  }

  findAll() {
    return `This action returns all mobileAccidentImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mobileAccidentImage`;
  }

  update(id: number, updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    return `This action updates a #${id} mobileAccidentImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} mobileAccidentImage`;
  }
}
