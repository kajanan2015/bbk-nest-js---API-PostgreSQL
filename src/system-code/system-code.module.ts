import { Module } from '@nestjs/common';
import { SystemCodeService } from './system-code.service';
import { SystemCodeController } from './system-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemCode } from './system-code.entity';
@Module({
  imports:[TypeOrmModule.forFeature([SystemCode])],
  controllers: [SystemCodeController],
  providers: [SystemCodeService]
})
export class SystemCodeModule {}
