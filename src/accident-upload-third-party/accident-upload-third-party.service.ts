import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccidentUploadThirdPartyDto } from './create-accident-upload-third-party.dto';
import { UpdateAccidentUploadThirdPartyDto } from './update-accident-upload-third-party.dto';
import { AccidentUploadThirdParty } from './accident-upload-third-party.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AccidentUploadThirdPartyService {
  constructor(
    @InjectRepository(AccidentUploadThirdParty)
    private accidentthirdparty: Repository<AccidentUploadThirdParty>,
  
    ) {}
  async create(createAccidentUploadThirdPartyDto: CreateAccidentUploadThirdPartyDto) {
    const response=this.accidentthirdparty.create(createAccidentUploadThirdPartyDto);
    return await this.accidentthirdparty.save(response);
  }

  async findAll() {
    return await this.accidentthirdparty.find();
  }

  async findOne(id: number) {
    const thirdparty = await this.accidentthirdparty.findOne(id);
    if (!thirdparty) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return thirdparty;
  
  }

  async update(id: number, updateAccidentUploadThirdPartyDto: UpdateAccidentUploadThirdPartyDto) {
    await this.accidentthirdparty.update({ id }, updateAccidentUploadThirdPartyDto);
    return await this.accidentthirdparty.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} accidentUploadThirdParty`;
  }
}
