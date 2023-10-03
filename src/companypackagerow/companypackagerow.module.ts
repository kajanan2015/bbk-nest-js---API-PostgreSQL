import { Module } from '@nestjs/common';
import { CompanypackagerowService } from './companypackagerow.service';
import { CompanypackagerowController } from './companypackagerow.controller';
import { Companypackagerow } from './companypackagerow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Companypackagerow,Createmodule,Createpackage,CompaniesEntity,Moduledetailsofpackage])],
  controllers: [CompanypackagerowController],
  providers: [CompanypackagerowService]
})
export class CompanypackagerowModule {}
