import { Vehicle } from "src/vehicle/vehicle.entity";
export class CreateVehicleTypeDto {

    id: number;
    typeName: string;
    status: boolean;
    seatCapacity: number;
    createdat:Date;
    updatedat:Date;
    vehicle:Vehicle[]
}
