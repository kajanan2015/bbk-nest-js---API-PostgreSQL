import { Module } from '@nestjs/common';
import { CreatepackageService } from './createpackage.service';
import { CreatepackageController } from './createpackage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createpackage } from './createpackage.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Modulepackagerelationship } from './modulepackagerelationship.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { ModuleCost } from './modulecost.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Createpackage,Createmodule,Modulepackagerelationship,ModuleCost])],
  controllers: [CreatepackageController],
  providers: [CreatepackageService,ImageUploadService]
})
export class CreatepackageModule {}
