import { EmployeeModule } from "src/employee-module/employee-module.entity"
import { EmployeeDocument } from "./employee-document.entity"

export class CreateEmployeeDocumentDto {
    id: number
    empid: EmployeeModule
    docPath: string
    docType: string
    description:string   
    status: Boolean
    createdat: Date;
}
