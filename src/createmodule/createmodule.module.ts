import { Module } from '@nestjs/common';
import { CreatemoduleService } from './createmodule.service';
import { CreatemoduleController } from './createmodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from './createmodule.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Createmodule,Createpackage,Moduledetailsofpackage])],
  controllers: [CreatemoduleController],
  providers: [CreatemoduleService,ImageUploadService]
})
export class CreatemoduleModule {}
