import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    Patch,
  } from '@nestjs/common';

  import { CompaniesService } from './companies.service';
  import { CompaniesDTO } from './dto/companies.dto';

  @Controller('companies')
  export class CompaniesController {
    constructor(private service: CompaniesService) {}

    @Get()
    async showAll() {
      const companies =  await this.service.showAll();
      return {
        statusCode: HttpStatus.OK,
        companies
      };
    }

    @Post()
    async create(@Body() data: CompaniesDTO) {
       const company = await this.service.create(data);
      return {
        statusCode: HttpStatus.OK,
        company
      };
    }

    @Get(':id')
    async read(@Param('id') id: number) {
      const company =  await this.service.read(id);
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