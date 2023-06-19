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
import { PagePermissionModule } from "./pagepermission/pagepermission.module";

import { MailModule } from './mail/mail.module';
import { EmployeeModule } from './employee/employee.module';
import { TripModule } from './trip/trip.module';
import { VehicleTypeModule } from "./vehicle-type/vehicle-type.module";
import { DriverModule } from "./driver/driver.module";
import { ImageUploadModule } from "./imageupload/imageupload.module";
import { DriverTypeModule } from './driver-type/driver-type.module';
import { PermissionRoleModule } from './permission-role/permission-role.module';
import { SubCompaniesModule } from './sub-companies/sub-companies.module';
import { SubadminassignModule } from './subadminassign/subadminassign.module';
import { MobileAccidentImageModule } from './defect/mobile-accident-image.module';
import { WalkarroundcheckvtypeModule } from './walkarroundcheckvtype/walkarroundcheckvtype.module';
import { DefectCasesModule } from './defect-cases/defect-cases.module';
import { DefectCasesResultModule } from './defect-cases-result/defect-cases-result.module';
import { DefectTripModule } from './defect-trip/defect-trip.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { SystemCodeModule } from './system-code/system-code.module';
import { CompanyDocumentModule } from './company-document/company-document.module';
import { AccidentUploadModule } from './accident-upload/accident-upload.module';
import { AccidentUploadImageModule } from './accident-upload-image/accident-upload-image.module';
import { AccidentUploadThirdPartyModule } from './accident-upload-third-party/accident-upload-third-party.module';
import { MovementModule } from './movement/movement.module';
import { FramelayoutModule } from './framelayout/framelayout.module';
import { EmployeeModuleModule } from './employee-module/employee-module.module';
import { EmployeeDocumentModule } from './employee-document/employee-document.module';
import { CreatemoduleModule } from './createmodule/createmodule.module';
import { CreatepackageModule } from './createpackage/createpackage.module';
import { ModuledetailsofpackageModule } from './moduledetailsofpackage/moduledetailsofpackage.module';
import { CompanyPaymentModule } from './company-payment/company-payment.module';
import { CustomizeTableModule } from './customize-table/customize-table.module';
import { EmployeeDataHistoryModule } from './employee-data-history/employee-data-history.module';





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
    DriverModule,
    ImageUploadModule,
    DriverTypeModule,
    PermissionRoleModule,
    SubCompaniesModule,
    PagePermissionModule,
    SubadminassignModule,
    MobileAccidentImageModule,
    WalkarroundcheckvtypeModule,
    DefectCasesModule,
    DefectCasesResultModule,
    DefectTripModule,
    VehicleModule,
    SystemCodeModule,
    CompanyDocumentModule,
    AccidentUploadModule,
    AccidentUploadImageModule,
    AccidentUploadThirdPartyModule,
    MovementModule,
    FramelayoutModule,
    EmployeeModuleModule,
    EmployeeDocumentModule,
    CreatemoduleModule,
    CreatepackageModule,
    ModuledetailsofpackageModule,
    CompanyPaymentModule,
    CustomizeTableModule,
    EmployeeDataHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
