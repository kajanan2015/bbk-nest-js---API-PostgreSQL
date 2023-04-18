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
import { pagepermissionDTO } from './pagepermission.dto';

  import { pagepermissionService } from './pagepermission.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
  @Controller('pagepermission')
  export class pagepermissionController {
    constructor(private service: pagepermissionService) {}
    
    @Get()
    async showAll() {
      const permissions =  await this.service.showAll();
      return {
        statusCode: HttpStatus.OK,
        permissions
      };
    }

    @Post()
    async create(@Body() data: pagepermissionDTO) {
       const permissions = await this.service.create(data);
      return {
        statusCode: HttpStatus.OK,
        permissions
      };
    }

    @Get(':id')
    async read(@Param('id') id: number) {
      const permissions =  await this.service.read(id);
      return {
        statusCode: HttpStatus.OK,
        permissions,
      };
    }

    @Put('/edit/:id')
    async uppdate(@Param('id') id: number, @Body() data: Partial<pagepermissionDTO>) {

      await this.service.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Permission updated successfully',
      };
    }
  }