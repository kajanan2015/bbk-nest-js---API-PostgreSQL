import { Vehicle } from "src/vehicle/vehicle.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
export class CreateVehicleTypeDto {

    id: number;
    typeName: string;
    status: boolean;
    seatCapacity: number;
    createdat:Date;
    updatedat:Date;
    vehicle:Vehicle[];
    company: CompaniesEntity;
}
