import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyPaymentService } from './company-payment.service';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Repository } from 'typeorm';
@UseGuards(AuthGuard('jwt'))
@Controller('company-payment')
export class CompanyPaymentController {

  constructor(private readonly companyPaymentService: CompanyPaymentService) { }
  // company payment store when sending payment link
  @Post()
  async create(@Body() data) {
   
    return this.companyPaymentService.create(data);
  }
  // find all company payment
  @Get()
  findAll() {
    return this.companyPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyPaymentDto: UpdateCompanyPaymentDto) {
    return this.companyPaymentService.update(+id, updateCompanyPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyPaymentService.remove(+id);
  }
}
