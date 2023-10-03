import { Module } from '@nestjs/common';
import { PermissionRoleService } from './permission-role.service';
import { PermissionRoleController } from './permission-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRoleEntity } from './permission-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRoleEntity])],
  controllers: [PermissionRoleController],
  providers: [PermissionRoleService]
})
export class PermissionRoleModule {}
