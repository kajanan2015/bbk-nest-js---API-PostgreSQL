export class CreateMobileAccidentImageDto {
    id:number;
    x:number;
    y:number;
    side:number;
    userId:number;
    createdat:Date;
    updatedat:Date;
    status: Boolean;
    patheImage:String;
    file:File;
}
