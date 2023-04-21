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
import { PagePermissionEntity } from './pagepermission.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('pagepermission')
export class PagePermissionController {
  constructor(private pagePermissionService: PagePermissionService) { }

  @Get()
  async showAll() {
    return await this.pagePermissionService.showAll();
  }

  @Get(':pageTypeId')
  async showParentPage(@Param('pageTypeId') pageTypeId: number) {
    return await this.pagePermissionService.showParentPage(pageTypeId);
  }

  @Get('/childpage/:parentPageValueId')
  async showChildPage(@Param('parentPageValueId') parentPageValueId: number) {
    return await this.pagePermissionService.showChildPage(parentPageValueId);
  }

  @Post()
  async create(@Body() pageData: PagePermissionEntity): Promise<PagePermissionEntity> {
    return await this.pagePermissionService.create(pageData);
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