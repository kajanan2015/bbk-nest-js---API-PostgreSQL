import { DefectCasesResult } from "src/defect-cases-result/defect-cases-result.entity";
export class CreateDefectTripDto {
    id:number;
    submitdate: Date;
    tripId:number;
    driverId:number;
    vehicleRegNo:string;
    odometerReading:string;
    place:string;
    defectNote:string;
    nilDefect:number;
    status: Boolean;
    defectCaseResults: DefectCasesResult[];
}
