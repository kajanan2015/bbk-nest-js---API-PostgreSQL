import { Module } from '@nestjs/common';
import { CompanyDocumentService } from './company-document.service';
import { CompanyDocumentController } from './company-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDocument } from './company-document.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { User } from 'src/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CompanyDocument, CompaniesEntity, User])],
  controllers: [CompanyDocumentController],
  providers: [CompanyDocumentService, ImageUploadService]
})
export class CompanyDocumentModule { }
