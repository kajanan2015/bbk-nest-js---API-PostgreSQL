import { Controller, Get, Post, Body, Patch, Param, Delete,Headers } from '@nestjs/common';
import { CompanypackagerowService } from './companypackagerow.service';
import { CreateCompanypackagerowDto } from './create-companypackagerow.dto';
import { UpdateCompanypackagerowDto } from './update-companypackagerow.dto';

@Controller('companypackagerow')
export class CompanypackagerowController {
  constructor(private readonly companypackagerowService: CompanypackagerowService) { }

  @Post()
  create(@Body() createCompanypackagerowDto: CreateCompanypackagerowDto) {
    return this.companypackagerowService.create(createCompanypackagerowDto);
  }

  @Get()
  findAll() {
    return this.companypackagerowService.findAll();
  }
  // get pending assign data by using companyid
  @Get(':id')
  findOne(@Param('id') id: string, @Headers('userTime') userTime) {
   let date;
    if(userTime){
    date=new Date(userTime);
   }else{
    date=new Date();
   }
    return this.companypackagerowService.findOne(+id,date);
  }
// get active assign data by using companyid 
@Get('activeassignpackage/:id')
findOneActive(@Param('id') id: string, @Headers('userTime') userTime) {
 let date;
  if(userTime){
  date=new Date(userTime);
 }else{
  date=new Date();
 }
  return this.companypackagerowService.findOneActive(+id,date);
}
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanypackagerowDto: UpdateCompanypackagerowDto) {
    return this.companypackagerowService.update(+id, updateCompanypackagerowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companypackagerowService.remove(+id);
  }
}
