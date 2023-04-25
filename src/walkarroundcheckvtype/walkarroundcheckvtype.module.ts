import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { walkarroundcheckvtypeController } from './walkarroundcheckvtype.controller';
import { walkarroundcheckvtypeService } from './walkarroundcheckvtype.service';
import { walkarroundcheckvtypeEntity } from './walkarroundcheckvtype.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@Module({
  imports: [TypeOrmModule.forFeature([walkarroundcheckvtypeEntity])],
  controllers: [walkarroundcheckvtypeController],
  providers: [walkarroundcheckvtypeService , ImageUploadService],
})
export class WalkarroundcheckvtypeModule {}