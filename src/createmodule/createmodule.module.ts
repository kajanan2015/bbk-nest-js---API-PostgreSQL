import { Module } from '@nestjs/common';
import { CreatemoduleService } from './createmodule.service';
import { CreatemoduleController } from './createmodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Createmodule } from './createmodule.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@Module({
  imports:[TypeOrmModule.forFeature([Createmodule])],
  controllers: [CreatemoduleController],
  providers: [CreatemoduleService,ImageUploadService]
})
export class CreatemoduleModule {}
