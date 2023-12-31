import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PermissionRoleService } from './permission-role.service';
import { CreatePermissionRoleDto } from './create-permission-role.dto';
import { UpdatePermissionRoleDto } from './update-permission-role.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('permission-role')
export class PermissionRoleController {
  constructor(private readonly permissionRoleService: PermissionRoleService) {}

  @Post()
  create(@Body() createPermissionRoleDto: CreatePermissionRoleDto) {
    return this.permissionRoleService.create(createPermissionRoleDto);
  }

  @Get()
  findAll() {
    return this.permissionRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionRoleService.findById(+id);
  }

  @Put('/edit/:id')
  update(@Param('id') id: string, @Body() updatePermissionRoleDto: UpdatePermissionRoleDto) {
    return this.permissionRoleService.update(+id, updatePermissionRoleDto);
  }

}
