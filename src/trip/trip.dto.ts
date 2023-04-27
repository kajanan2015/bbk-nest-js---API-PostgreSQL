export interface TripDTO {
  id: number;
  name: string | null;
  code: string | null;
  createdat: Date;
  driverId: number;
  vehicleId: number;
  movementId: number;
  frameLayout: string;
  vehicleCompany: string;
  defectStatus: string;
  previousMileage: string;
  date: Date;
  res: string;
  
  }