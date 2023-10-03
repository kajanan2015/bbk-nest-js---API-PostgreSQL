export class CreateMobileAccidentImageDto {
    id:number;
    x:number;
    y:number;
    side:number;
    tripId:number;
    createdat:Date;
    updatedat:Date;
    status: Boolean;
    patheImage:String;
    file:File;
    inOut:number;
    orderMeterId:String;
}
