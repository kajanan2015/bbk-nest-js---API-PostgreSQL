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
  console.log(createAccidentUploadDto)
  console.log(createAccidentUploadDto.filename[1].accidentImages)
  console.log(createAccidentUploadDto.filename[0].vehicleRegPhoto)
  let accidentImage=[];
  if(createAccidentUploadDto.filename[1]){
   accidentImage=createAccidentUploadDto.filename[1].accidentImages
  }
  const files = accidentImage.map(patheImage => ({ patheImage }));
   console.log(files,666)
  let vehicleRegPhoto;
  
  let submitdata=[]
  createAccidentUploadDto.filename.forEach(element => {
    const keys = Object.keys(element);
    const values = Object.values(element);
    console.log(keys[0],34636746354)
    console.log(values[0][0],34636746354)
    const pair = [keys[0]].concat(values[0][0]);
const newObj = { [keys[0]]: [values] };
submitdata.push(newObj);

  });
  console.log(submitdata,4444);

  const data={
    ...createAccidentUploadDto,
    accidentImages:files,
  }
console.log(data,89898989898)
    const response=this.accidentupload.create(data);
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
