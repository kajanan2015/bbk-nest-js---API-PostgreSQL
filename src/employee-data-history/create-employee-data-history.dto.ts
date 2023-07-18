import { EmployeeInfo } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";

export class CreateEmployeeDataHistoryDto {
    id:number;
    employee:EmployeeInfo[];
    type:string;
    data:string;
    editedBy:User[];
    createdBy:User[];
    startDate:Date;
    endDate:Date;
    editedDate: Date;
    active:boolean;
    status:boolean;
}
