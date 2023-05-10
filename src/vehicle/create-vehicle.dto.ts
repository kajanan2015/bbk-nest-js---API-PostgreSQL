import { TripEntity } from "src/trip/trip.entity";
import { VehicleTypeEntity } from "src/vehicle-type/vehicle-type.entity";
import { AccidentUpload } from "src/accident-upload/accident-upload.entity";
export class CreateVehicleDto {
    id: number;
    vehicleName: string;
    vehicleRegNumber: string;
    vehicleCompany: string;
    status: boolean;
    vehicletrip:TripEntity[];
    vehicletype: VehicleTypeEntity;
    vehicleaccident:AccidentUpload[];
}
