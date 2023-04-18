import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pagepermissionController } from './pagepermission.controller';
import { pagepermissionService } from './pagepermission.service';
import { pagepermissionEntity } from './pagepermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([pagepermissionEntity])],
  controllers: [pagepermissionController],
  providers: [pagepermissionService],
})
export class pagepermissionModule {}