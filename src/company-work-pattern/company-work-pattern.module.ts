import { Module } from '@nestjs/common';
import { CompanyWorkPatternService } from './company-work-pattern.service';
import { CompanyWorkPatternController } from './company-work-pattern.controller';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { SystemCode } from 'src/system-code/system-code.entity';
@Module({
  imports:[TypeOrmModule.forFeature([CompanyWorkPattern,User,SystemCode])],
  controllers: [CompanyWorkPatternController],
  providers: [CompanyWorkPatternService,SystemCodeService]
})
export class CompanyWorkPatternModule {}
