import { Module } from '@nestjs/common';
import { CreatemoduleService } from './createmodule.service';
import { CreatemoduleController } from './createmodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from './createmodule.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { User } from 'src/user/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Createmodule,Createpackage,Moduledetailsofpackage,User])],
  controllers: [CreatemoduleController],
  providers: [CreatemoduleService,ImageUploadService]
})
export class CreatemoduleModule {}
