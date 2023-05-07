import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccidentUploadImageDto } from './create-accident-upload-image.dto';
import { UpdateAccidentUploadImageDto } from './update-accident-upload-image.dto';
import { AccidentUploadImage } from './accident-upload-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AccidentUploadImageService {

  constructor(
    @InjectRepository(AccidentUploadImage)
    private accidentuploadimage:Repository<AccidentUploadImage>
  ){}
 async create(createAccidentUploadImageDto: CreateAccidentUploadImageDto) {
    const response=this.accidentuploadimage.create(createAccidentUploadImageDto);
    return await this.accidentuploadimage.save(response);
  }

  async findAll() {
    return await this.accidentuploadimage.find();
  }

  async findOne(id: number) {
    const accidentimage = await this.accidentuploadimage.findOne(id);
    if (!accidentimage) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return accidentimage;
  }

  async update(id: number, updateAccidentUploadImageDto: UpdateAccidentUploadImageDto) {
    await this.accidentuploadimage.update({ id }, updateAccidentUploadImageDto);
    return await this.accidentuploadimage.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} accidentUploadImage`;
  }
}
