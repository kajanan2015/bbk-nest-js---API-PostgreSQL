import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDefectTripDto } from './create-defect-trip.dto';
import { UpdateDefectTripDto } from './update-defect-trip.dto';
import { DefectTrip } from './defect-trip.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class DefectTripService {

  constructor(
    @InjectRepository(DefectTrip)
    private defectrip: Repository<DefectTrip>,
    private   readonly imageUploadServiceRepository: ImageUploadService,
  ) {}

  async create(createDefectTripDto: CreateDefectTripDto) {
    const response=this.defectrip.create(createDefectTripDto);
    return await this.defectrip.save(response);
  }

  async findAll() {
    return await this.defectrip.find({ 
      where: { status: 1 },
      relations: ['defectCaseResults'] 
    }, );
  }

 async findOne(id: number) {
  const defecttrip = await this.defectrip.findOne(id,{ relations: ['defectCaseResults'] });
  if (!defecttrip) {
    throw new NotFoundException(` ID '${id}' not found`);
  }
  return defecttrip;
  }

  async update(id: number, updateDefectTripDto: UpdateDefectTripDto) {
    await this.defectrip.update({ id }, updateDefectTripDto);
    return await this.defectrip.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} defectTrip`;
  }
}
