import { Vehicle } from "src/vehicle/vehicle.entity";
export class CreateMovementDto {
    id: number;
    name: string | null;
    code: string | null;
    createdat: Date;
    movementId: number;
    frameLayout: string;
    defectStatus: string;
    previousMileage: string;
    date: Date;
    res: string;
    status: Boolean;
    completedTime: Date;
    startedTime: Date;
    startMileage:string;
    endMileage:string;
    dropLocation: string;
    pickupLocation: string;
    vehicle: Vehicle;
    assignStartedTime: string;
    assignCompletedTime: string;
  
}
