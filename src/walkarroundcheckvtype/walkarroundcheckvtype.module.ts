import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { walkarroundcheckvtypeController } from './walkarroundcheckvtype.controller';
import { walkarroundcheckvtypeService } from './walkarroundcheckvtype.service';
import { walkarroundcheckvtypeEntity } from './walkarroundcheckvtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([walkarroundcheckvtypeEntity])],
  controllers: [walkarroundcheckvtypeController],
  providers: [walkarroundcheckvtypeService],
})
export class WalkarroundcheckvtypeModule {}