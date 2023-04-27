import { DefectCasesResult } from "src/defect-cases-result/defect-cases-result.entity";
export class CreateDefectTripDto {
    id:number;
    submitdate: Date;
    tripId:number;
    vehicleRegNo:string;
    vehicleRegPhoto:string;
    odometerReading:string;
    place:string;
    defectNote:string;
    nilDefect:number;
    status: Boolean;
    defectCaseResultId:DefectCasesResult;
}
