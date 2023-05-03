import { TripEntity } from "src/trip/trip.entity";
export class CreateVehicleDto {
    id: number;
    vehicleName: string;
    vehicleRegNumber: string;
    vehicleCompany: string;
    status: boolean;
    vehicletrip:TripEntity[]
}
