import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyPaymentService } from './company-payment.service';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';

@Controller('company-payment')
export class CompanyPaymentController {
  constructor(private readonly companyPaymentService: CompanyPaymentService) {}

  @Post()
  create(@Body() createCompanyPaymentDto: CreateCompanyPaymentDto) {
    return this.companyPaymentService.create(createCompanyPaymentDto);
  }

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
