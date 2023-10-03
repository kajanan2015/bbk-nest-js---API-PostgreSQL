import { Module } from '@nestjs/common';
import { SubCompaniesService } from './sub-companies.service';
import { SubCompaniesController } from './sub-companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCompanyEntity } from './sub-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCompanyEntity])],

  controllers: [SubCompaniesController],
  providers: [SubCompaniesService]
})
export class SubCompaniesModule {}
