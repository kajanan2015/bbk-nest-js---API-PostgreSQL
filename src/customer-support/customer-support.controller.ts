import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { CustomerSupportService } from './customer-support.service';
import { UpdateCustomerSupportDto } from './update-customer-support.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('customer-support')
export class CustomerSupportController {
  constructor(
    private readonly customerSupportService: CustomerSupportService
  ) { }

  // ** Create inquiry
  @Post()
  create(@Body() customerSupportData) {
    const savedData = this.customerSupportService.create(customerSupportData['data']);

    const successResponse = {
      success: true,
      data: savedData,
      message: 'success',
    };

    return successResponse;
  }

  // ** Get all inquiry data
  @Get()
  findAll() {
    return this.customerSupportService.findAll();
  }

  // ** Get one inquiry
  @Get('view-ticket/:id')
  findOne(@Param('id') id: number) {
    return this.customerSupportService.findOne(+id);
  }

  // ** Get inquiry history based on customer support id
  @Get('get-history/:customerSupportId')
  findHistory(@Param('customerSupportId') customerSupportId: number) {
    return this.customerSupportService.findHistory(+customerSupportId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerSupportDto: UpdateCustomerSupportDto) {
    return this.customerSupportService.update(+id, updateCustomerSupportDto);
  }

  // ** Get inquiry type data
  @Get('/inquiryType')
  async getInquiryType() {
    const inquiryType = await this.customerSupportService.getInquiryType();
    return inquiryType
  }
}
