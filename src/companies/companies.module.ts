import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesEntity } from './companies.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesEntity])],
  controllers: [CompaniesController],
  providers: [CompaniesService, ImageUploadService],
})
export class CompaniesModule {}