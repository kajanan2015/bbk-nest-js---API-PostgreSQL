import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity]),UserModule],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule {}
