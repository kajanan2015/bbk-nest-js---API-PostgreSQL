import { Module } from '@nestjs/common';
import { CreatepackageService } from './createpackage.service';
import { CreatepackageController } from './createpackage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createpackage } from './createpackage.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { ModuledetailsofpackageModule } from 'src/moduledetailsofpackage/moduledetailsofpackage.module';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { ModuledetailsofpackageService } from 'src/moduledetailsofpackage/moduledetailsofpackage.service';
import { User } from 'src/user/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Createpackage,Createmodule,Moduledetailsofpackage,User]),ModuledetailsofpackageModule],
  controllers: [CreatepackageController],
  providers: [CreatepackageService,ImageUploadService,ModuledetailsofpackageService]
})
export class CreatepackageModule {}
