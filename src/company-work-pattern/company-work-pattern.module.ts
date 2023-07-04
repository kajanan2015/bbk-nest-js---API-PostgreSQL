import { Module } from '@nestjs/common';
import { CompanyWorkPatternService } from './company-work-pattern.service';
import { CompanyWorkPatternController } from './company-work-pattern.controller';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyWorkPattern])],
  controllers: [CompanyWorkPatternController],
  providers: [CompanyWorkPatternService]
})
export class CompanyWorkPatternModule {}
