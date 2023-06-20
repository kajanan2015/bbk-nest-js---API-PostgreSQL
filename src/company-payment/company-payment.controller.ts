import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyPaymentService } from './company-payment.service';
import { CreateCompanyPaymentDto } from './create-company-payment.dto';
import { UpdateCompanyPaymentDto } from './update-company-payment.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('company-payment')
export class CompanyPaymentController {
  constructor(private readonly companyPaymentService: CompanyPaymentService) {}
// company payment store when sending payment link
  @Post()
  async create(@Body() createCompanyPaymentDto: CreateCompanyPaymentDto) {
    return this.companyPaymentService.create(createCompanyPaymentDto);
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
