export interface TripDTO {
  id: number;
  name: string | null;
  code: string | null;
  createdat: Date;
  driverId: string;
  vehicleId: string;
  movementId: number;
  frameLayout: string;
  vehicleCompany: string;
  defectStatus: string;
  previousMileage: string;
  date: Date;
  res: string;
  
  }