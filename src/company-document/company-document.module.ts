import { Module } from '@nestjs/common';
import { CompanyDocumentService } from './company-document.service';
import { CompanyDocumentController } from './company-document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDocument } from './company-document.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyDocument,CompaniesEntity])],
  controllers: [CompanyDocumentController],
  providers: [CompanyDocumentService]
})
export class CompanyDocumentModule {}
