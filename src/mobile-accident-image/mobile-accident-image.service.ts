import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMobileAccidentImageDto } from './create-mobile-accident-image.dto';
import { UpdateMobileAccidentImageDto } from './update-mobile-accident-image.dto';
import { Bodymark } from './mobile-accident-image.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@Injectable()
export class MobileAccidentImageService {
  constructor(
    @InjectRepository(Bodymark)
    private mobileAccidentImageRepository: Repository<Bodymark>,
    private   readonly imageUploadServiceRepository: ImageUploadService,
  ) {}

  async create(createMobileAccidentImage) {
   
    // const imageUrl=await this.imageUploadServiceRepository.uploadimage(imagepath);
    // console.log(imageUrl,9090909090909);
    const response=this.mobileAccidentImageRepository.create(createMobileAccidentImage);
    return await this.mobileAccidentImageRepository.save(response);
    // return "succe";
  }

 async findAll() {
    return await this.mobileAccidentImageRepository.find({ 
      where: { status: 1 }, 
    });
  }

  async findOne(id: number) {
    const mobileaccident = await this.mobileAccidentImageRepository.findOne(id);
    if (!mobileaccident) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return mobileaccident;
  }

  async update(id: number, updateMobileAccidentImageDto: UpdateMobileAccidentImageDto) {
    await this.mobileAccidentImageRepository.update({ id }, updateMobileAccidentImageDto);
    return await this.mobileAccidentImageRepository.findOne({ id });

  }

  async remove(id: number) {
    const mobileaccident = await this.mobileAccidentImageRepository.find({ 
      where: { tripId: id }, 
    });
    if (!mobileaccident) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return this.mobileAccidentImageRepository.remove(mobileaccident)
    
  }
}
