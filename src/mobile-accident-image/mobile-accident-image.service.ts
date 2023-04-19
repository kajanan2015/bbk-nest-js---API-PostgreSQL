import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';
import { MobileAccidentImage } from './mobile-accident-image.entity';
@Injectable()
export class MobileAccidentImageService {
  constructor(
    @InjectRepository(MobileAccidentImage)
    private mobileAccidentImageRepository: Repository<MobileAccidentImage>,
  ) {}

  async create(createMobileAccidentImageDto: CreateMobileAccidentImageDto) {
    const mobileaccidentImage = Object.assign(new MobileAccidentImage(), createMobileAccidentImageDto);
    console.log(mobileaccidentImage)
    const response=await this.mobileAccidentImageRepository.save(mobileaccidentImage);
    return response;
  }

 async findAll() {
    return await this.mobileAccidentImageRepository.find({ 
      where: { Status: 1 }, 
    });
  }

  async findOne(id: number) {
    const mobileaccident = await this.mobileAccidentImageRepository.findOne(id);
    if (!mobileaccident) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
    return mobileaccident;
  }

  async update(id: number, updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    await this.mobileAccidentImageRepository.update({ id }, updateMobileAccidentImageDto);
   console.log("df")
    return await this.mobileAccidentImageRepository.findOne({ id });

  }

  remove(id: number) {
    return `This action removes a #${id} mobileAccidentImage`;
  }
}
