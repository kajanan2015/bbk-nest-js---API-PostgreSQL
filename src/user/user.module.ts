import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

import { UserService } from './user.service';
import { User } from './user.entity';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { PermissionRoleModule } from 'src/permission-role/permission-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, PermissionRoleEntity]), PermissionRoleModule],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule { }
