import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
  } from '@nestjs/common';

  import { CompaniesService } from './companies.service';
  import { CompaniesDTO } from './companies.dto';

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
       const user = await this.service.create(data);
      return {
        statusCode: HttpStatus.OK,
        user
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
        message: 'User updated successfully',
      };
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
      await this.service.destroy(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
  }