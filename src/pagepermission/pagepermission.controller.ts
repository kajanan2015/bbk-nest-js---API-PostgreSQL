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
import { pagepermissionDTO } from './pagepermission.dto';

import { PagePermissionService } from './pagepermission.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('pagepermission')
export class PagePermissionController {
  constructor(private pagePermissionService: PagePermissionService) { }

  @Get()
  async showAll() {
    return await this.pagePermissionService.showAll();
  }

  @Post()
  async create(@Body() data: pagepermissionDTO) {
    return await this.pagePermissionService.create(data);
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    return await this.pagePermissionService.read(id);
  }

  @Put('/edit/:id')
  async update(@Param('id') id: number, @Body() data: Partial<pagepermissionDTO>) {
    return await this.pagePermissionService.update(id, data);
  }
}