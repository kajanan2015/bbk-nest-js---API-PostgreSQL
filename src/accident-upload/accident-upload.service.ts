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
  
  // console.log(createAccidentUploadDto.filename[0].vehicleRegPhoto)
  let accidentImage=[];
  if(createAccidentUploadDto.filename[0]){
   accidentImage=createAccidentUploadDto.filename[0].accidentImages
  }
  const files = accidentImage.map(patheImage => ({ patheImage }));
   
  let vehicleRegPhoto;
  
  let submitdata=[]
  createAccidentUploadDto.filename.forEach(element => {
   
    const keys = Object.keys(element);
    const values = Object.values(element);
    const keyed=keys[0]
    console.log(values[0][0],34636746354)
    const pair = [keys[0]].concat(values[0][0]);
const newObj = { [keyed]: values[0][0] };
submitdata.push(newObj);

  });
 
  const accidentThirdParty = [...createAccidentUploadDto.accidentThirdParty];
const newsubmitdata=submitdata.splice(1);
for (let i = 0; i < newsubmitdata.length; i++) {
  accidentThirdParty[i].vehicleRegPhoto = newsubmitdata[i][`accidentThirdParty[${i}][vehicleRegPhoto]`];
}

// accidentThirdParty[0].vehicleRegPhoto = "hghhhfgf/lkk"
const newaccidentvalue=Object.values(accidentThirdParty)


// accidentThirdParty[1].vehicleRegPhoto = "hghhhfgf/lkk"
  const data={
    ...createAccidentUploadDto,
    accidentImages:files,
    newaccidentvalue
   
  }

    const response=this.accidentupload.create(data);
    return await this.accidentupload.save(response);
  }

  async findAll() {
    return await this.accidentupload.find(
      {
        where: { status: 1},
        relations: ['accidentThirdParty','accidentImages','vehicle']
      }
    );
  }

  async findOneByTrip(id: number) {
    console.log(id,89899898989889)
    return await this.accidentupload.find(
      {
        where: { status: 1,tripId:id},
        relations: ['accidentThirdParty','accidentImages','vehicle']
      }
    );
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
