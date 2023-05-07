import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccidentUploadDto } from './create-accident-upload.dto';
import { UpdateAccidentUploadDto } from './update-accident-upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccidentUpload } from './accident-upload.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AccidentUploadService {
 
  constructor(
    @InjectRepository(AccidentUpload)
    private accidentupload:Repository<AccidentUpload>
  ){}
 async create(createAccidentUploadDto: CreateAccidentUploadDto) {
    const response=this.accidentupload.create(createAccidentUploadDto);
    return await this.accidentupload.save(response);
  }

  async findAll() {
    return await this.accidentupload.find();
  }

  async findOne(id: number) {
    const accident = await this.accidentupload.findOne(id);
    if (!accident) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return accident;
  }

  async update(id: number, updateAccidentUploadDto: UpdateAccidentUploadDto) {
    await this.accidentupload.update({ id }, updateAccidentUploadDto);
    return await this.accidentupload.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} accidentUpload`;
  }
}
