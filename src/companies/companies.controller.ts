import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CompaniesDTO } from './companies.dto';

import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';
import { CompaniesEntity } from './companies.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(private service: CompaniesService) { }

  @Get()
  async showAll() {
    const companies = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @Get('/subcompanies/:mainCompanyId')
  async showSubAll(@Param('mainCompanyId') mainCompanyId: number) {
    const companies = await this.service.showSubAll(mainCompanyId);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @Post()
  async create(@Body() companyData: CompaniesEntity): Promise<CompaniesEntity> {
    return await this.service.create(companyData);
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const company = await this.service.read(id);
    return {
      statusCode: HttpStatus.OK,
      company,
    };
  }

  @Put('/edit/:id')
  async uppdate(@Param('id') id: number, @Body() data: Partial<CompaniesDTO>) {

    await this.service.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Company updated successfully',
    };
  }
}