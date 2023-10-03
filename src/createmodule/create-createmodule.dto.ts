import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";
import { User } from "src/user/user.entity";
import { Companypackagerow } from "src/companypackagerow/companypackagerow.entity";
export class CreateCreatemoduleDto {

    id:number;
    modulename:string;
    moduleName:string;
    modulelogo: string;
    status: number;
    moduledetails:Moduledetailsofpackage[];
    existlogo:string;
    createdat: Date;
    updatedat: Date;
    moduleupdate: User;
    modulecreate: User;
    userId:number;
    companypackagerow:Companypackagerow[];
}
