import { Createmodule } from "src/createmodule/createmodule.entity";
import { Createpackage } from "src/createpackage/createpackage.entity";
export class CreateModuledetailsofpackageDto {
   
    id: number;
    NoOfRecords: number;
    CostPerRecord: number;
    PackagePrice: number;
    module: Createmodule;
    packages: Createpackage;
}
