import { Module } from '@nestjs/common';
import { CreatemoduleService } from './createmodule.service';
import { CreatemoduleController } from './createmodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from './createmodule.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Modulepackagerelationship } from 'src/createpackage/modulepackagerelationship.entity';
import { ModuleCost } from 'src/createpackage/modulecost.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Createmodule,Createpackage,Modulepackagerelationship,ModuleCost])],
  controllers: [CreatemoduleController],
  providers: [CreatemoduleService,ImageUploadService]
})
export class CreatemoduleModule {}
