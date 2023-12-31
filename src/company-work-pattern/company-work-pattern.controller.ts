import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Headers, Put } from '@nestjs/common';
import { CompanyWorkPatternService } from './company-work-pattern.service';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('company-work-pattern')
export class CompanyWorkPatternController {
  constructor(private readonly companyWorkPatternService: CompanyWorkPatternService) { }

  @Post('create-pattern')
  async create(@Body() createCompanyWorkPatternDto: CreateCompanyWorkPatternDto) {
    return await this.companyWorkPatternService.create(createCompanyWorkPatternDto);
  }

  @Get()
  async findAllActive() {
    return await this.companyWorkPatternService.findAllActive();
  
  }

  @Get('findbycompanyid/:id')
  async findAllActiveCompanyWise(@Param('id') companyid){
    return await this.companyWorkPatternService.findAllActiveCompanyWise(companyid);
  }

  @Get('findallpattern/:id')
  async findAll(@Param('id') companyid) {
    return await this.companyWorkPatternService.findAll(companyid);
  }
  @Post('findByname/:name')
  async findByname(@Param('name') name: string, @Body() data) {
    return await this.companyWorkPatternService.findbypattername(name, data.company);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.companyWorkPatternService.findOne(+id);
  }

  @Get('findOneBycode/:code')
  async findOneBycode(@Param('code') code){
  console.log(code,77878787)
    return await this.companyWorkPatternService.findOneBycode(code)
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCompanyWorkPatternDto: UpdateCompanyWorkPatternDto) {
    return await this.companyWorkPatternService.update(+id, updateCompanyWorkPatternDto);
  }

  @Post('find-current-pattern/:empid')
  async findCurrentPattern(@Param('empid') empid, @Body() data){
    const date=new Date(data.date);
    return await this.companyWorkPatternService.findCurrentWorkPattern(empid,date)
  }

  @Post('find-future-patterns/:empid')
  async findFuturePatterns(@Param('empid') empid, @Body() data){
    const date=new Date(data.date);
    return await this.companyWorkPatternService.findFutureWorkPatterns(empid,date)
  }

  @Get('history/:empid')
  async findEmpWorkPatternHistory(@Param('empid') empid){
    return await this.companyWorkPatternService.getWorkPatternHistoryData(empid);
  }


  @Post('find-workPatternCode-workType')
  async findOneBypatternCode(@Body() data) {
    return await this.companyWorkPatternService.findOneBypatternCode(data);
  }

// assign work pattern to the employee
@Post('assign-work-pattern')
async assignworkpatterntoemployee(@Body() data, @Headers('userTime') userTime ){
  let date;
  if(userTime){
   date=new Date(userTime);
  }else{
   date=new Date();
  }
  data.userTime=date;
       return await this.companyWorkPatternService.assignworkpatterntoemployee(data);
}


@Delete(':id')
async remove(@Param('id') id: string) {
   return await this.companyWorkPatternService.remove(+id);
 }

 @Put('editassignworkpattern/:id')
 async editworkpattern(@Param('id') id: string,@Body() data){
  console.log(data,89223)
return await this.companyWorkPatternService.editassignworkpattern(id,data);
 }

 
 
}
