import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesEntity } from './companies.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { PagePermissionModule } from 'src/pagepermission/pagepermission.module';
import { PagePermissionService } from 'src/pagepermission/pagepermission.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity, PagePermissionEntity]), PagePermissionModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ImageUploadService, PagePermissionService],
})
export class CompaniesModule {}