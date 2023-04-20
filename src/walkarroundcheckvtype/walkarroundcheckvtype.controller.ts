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
    UseGuards,
  } from '@nestjs/common';
import { walkarroundcheckvtypeDTO } from './walkarroundcheckvtype.dto';

  import { walkarroundcheckvtypeService } from './walkarroundcheckvtype.service';

  @Controller('walkarroundcheckvtype')
  export class walkarroundcheckvtypeController {
    constructor(private service: walkarroundcheckvtypeService) {}
    
    @Get()
    async showAll() {
      const permissions =  await this.service.showAll();
      return {
        statusCode: HttpStatus.OK,
        permissions
      };
    }

    @Post()
    async create(@Body() data: walkarroundcheckvtypeDTO) {
       const permissions = await this.service.create(data);
      return {
        statusCode: HttpStatus.OK,
        permissions
      };
    }

    @Get('/vtype/:type')
    async read(@Param('type') type: string) {
      const permissions =  await this.service.read(type);
      return {
        statusCode: HttpStatus.OK,
        permissions,
      };
    }

    @Put('/edit/:id')
    async uppdate(@Param('id') id: number, @Body() data: Partial<walkarroundcheckvtypeDTO>) {

      await this.service.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Permission updated successfully',
      };
    }
  }