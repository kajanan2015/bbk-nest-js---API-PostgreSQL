import { EmployeeModule } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";

export class CreateEmployeeDataHistoryDto {
    id:number;
    employee:EmployeeModule[];
    type:string;
    data:string;
    editedBy:User[];
    createdBy:User[];
    startDate:Date;
    endDate:Date;
    editedDate: Date;
    status:boolean;
}
