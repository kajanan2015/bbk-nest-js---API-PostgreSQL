export interface TripDTO {
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
  }