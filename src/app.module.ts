import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { MulterExtendedModule } from "nestjs-multer-extended";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { CommonModule } from "./common/common.module";
import { CompaniesModule } from "./companies/companies.module";


import { MailModule } from './mail/mail.module';
import { EmployeeModule } from './employee/employee.module';
import { TripModule } from './trip/trip.module';
import { VehicleTypeModule } from "./vehicle-type/vehicle-type.module";
import { DriverModule } from "./driver/driver.module";




const settings = require("../ormconfig.js");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot(settings),
    AuthModule,
    UserModule,
    CommonModule,
    CompaniesModule,
    MailModule,
    EmployeeModule,
    TripModule,
    VehicleTypeModule,
    DriverModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
