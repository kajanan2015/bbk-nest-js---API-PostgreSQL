import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagePermissionController } from './pagepermission.controller';
import { PagePermissionService } from './pagepermission.service';
import { PagePermissionEntity } from './pagepermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagePermissionEntity])],
  controllers: [PagePermissionController],
  providers: [PagePermissionService],
})
export class PagePermissionModule {}