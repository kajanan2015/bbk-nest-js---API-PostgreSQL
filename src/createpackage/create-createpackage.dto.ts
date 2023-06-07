import { Createmodule } from "src/createmodule/createmodule.entity";
import { ModuleCost } from "./modulecost.entity";
import { Modulepackagerelationship } from "./modulepackagerelationship.entity";
export class CreateCreatepackageDto {   
    id:number;
    packagename:string;
    packagelogo: string;
    status: Boolean;
    moduleentity: Createmodule[];
    NoOfRecords: number;
    CostPerRecord: number;
    PackagePrice: number;
}
