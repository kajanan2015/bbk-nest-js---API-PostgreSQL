import { DefectCasesResult } from "src/defect-cases-result/defect-cases-result.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
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
    vehicleId:number;
    vehicle:Vehicle;
    defectCaseResults: DefectCasesResult[];
}
