import { Injectable } from '@nestjs/common';
import { CreateDefectTripDto } from './create-defect-trip.dto';
import { UpdateDefectTripDto } from './update-defect-trip.dto';

@Injectable()
export class DefectTripService {
  create(createDefectTripDto: CreateDefectTripDto) {
    return 'This action adds a new defectTrip';
  }

  findAll() {
    return `This action returns all defectTrip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defectTrip`;
  }

  update(id: number, updateDefectTripDto: UpdateDefectTripDto) {
    return `This action updates a #${id} defectTrip`;
  }

  remove(id: number) {
    return `This action removes a #${id} defectTrip`;
  }
}
