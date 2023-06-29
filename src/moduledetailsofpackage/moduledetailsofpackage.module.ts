import { Module } from '@nestjs/common';
import { ModuledetailsofpackageService } from './moduledetailsofpackage.service';
import { ModuledetailsofpackageController } from './moduledetailsofpackage.controller';
import { Moduledetailsofpackage } from './moduledetailsofpackage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CreatepackageModule } from 'src/createpackage/createpackage.module';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Moduledetailsofpackage,Createmodule, Createpackage, CompaniesEntity,Companypackagerow])],
  controllers: [ModuledetailsofpackageController],
  providers: [ModuledetailsofpackageService]
})
export class ModuledetailsofpackageModule {}
