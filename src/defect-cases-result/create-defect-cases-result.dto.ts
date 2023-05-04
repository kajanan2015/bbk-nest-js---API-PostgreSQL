import { defectCases } from "src/defect-cases/defect-case.entity";

export class CreateDefectCasesResultDto {
    id:number;
    // questionId:number;
    resultQuestion:number;
    defectnote:string;
    status: Boolean;  
    question: defectCases;
}
