import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CompanyWorkPatternService {
  constructor(
    @InjectRepository(CompanyWorkPattern)
    private readonly patternrepository:Repository<CompanyWorkPattern>
  ){}
 async create(createCompanyWorkPatternDto: CreateCompanyWorkPatternDto) {
  await this.findbypattername(createCompanyWorkPatternDto.workPatternName,createCompanyWorkPatternDto.company)
  createCompanyWorkPatternDto.workType=0;
  const response= await this.patternrepository.create(createCompanyWorkPatternDto)
  const withputtimepattern=await this.patternrepository.save(response);
  createCompanyWorkPatternDto.workType=1;
  const response2= await this.patternrepository.create(createCompanyWorkPatternDto)
  const withtimepattern=await this.patternrepository.save(response2)

  if(withputtimepattern&&withtimepattern){
    return "successfully created"
  }else{
    return "error occured"
  }
  }

  async findAll() {
   return await this.patternrepository.find({relations:['company']})
  }
async findbypattername(name:string,companyId){
  
  const pattern = await this.patternrepository.find({where:{workPatternName:name,company:companyId}});
  console.log(pattern,8787878)
  if (pattern.length>0) {
    console.log('master')
    throw new BadRequestException('patter-name exist');


}
}
  async findOne(id: number) {
    const workpattern = await this.patternrepository.findOne(id);
    if (!workpattern) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return workpattern;
  }

 async update(id: number, updateCompanyWorkPatternDto: UpdateCompanyWorkPatternDto) {
   return await this.patternrepository.update(id,updateCompanyWorkPatternDto)
  }

  remove(id: number) {
    return `This action removes a #${id} companyWorkPattern`;
  }
}
