import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";
export class CreateCreatepackageDto {   
    id:number;
    packagename:string;
    packagelogo: string;
    status: number;
    packagedetails:Moduledetailsofpackage[]
 
}
