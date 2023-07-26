import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { CustomerSupportService } from './customer-support.service';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer-support')
export class CustomerSupportController {
  constructor(
    private readonly customerSupportService: CustomerSupportService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() customerSupportData) {
    return this.customerSupportService.create(customerSupportData['data']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.customerSupportService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('customerSupport/:id')
  findOne(@Param('id') id: string) {
    return this.customerSupportService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerSupportDto: UpdateCustomerSupportDto) {
    return this.customerSupportService.update(+id, updateCustomerSupportDto);
  }

  // ** Get inquiry type data
  @UseGuards(AuthGuard('jwt'))
  @Get('/inquiryType')
  async getInquiryType() {
    const inquiryType = await this.customerSupportService.getInquiryType();
    return inquiryType
  }
}
