import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";

export class CreateCreatemoduleDto {

    id:number;
    modulename:string;
    modulelogo: string;
    status: number;
    moduledetails:Moduledetailsofpackage[]
}
