export class CreateJobTypeDto {
    id: number;
    shortCode: string;
    pickColor: string;
    individualEmployeeRate: boolean;
    companyFixedRate: boolean;
    addWithSalary: boolean;
    noPay:boolean;
    setRatePerHour:string;
}
