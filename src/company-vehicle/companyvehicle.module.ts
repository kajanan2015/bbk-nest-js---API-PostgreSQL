import { Module } from '@nestjs/common';
import { CompanyvehicleService } from './companyvehicle.service';
import { CompanyvehicleController } from './companyvehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { companyvehicledata } from './companyvehicle.entity';
import { liveryEntity } from './livery.entity';
import { licenseCategoryEntity } from './licensecategory.entity';
import { fuelTypeEntity } from './fueltype.entity';
import { defaultBaseEntity } from './defaulbase.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Module({
  imports: [TypeOrmModule.forFeature([companyvehicledata, liveryEntity, licenseCategoryEntity, fuelTypeEntity, defaultBaseEntity])],
  controllers: [CompanyvehicleController],
  providers: [CompanyvehicleService, ImageUploadService]
})
export class CompanyvehicleModule {}
