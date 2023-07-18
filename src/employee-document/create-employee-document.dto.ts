
import { Employee } from "src/employee-module/employee-module.entity"

export class CreateEmployeeDocumentDto {
    id: number
    empid: Employee
    docPath: string
    docType: string
    description:string   
    status: Boolean
    createdat: Date;
}
