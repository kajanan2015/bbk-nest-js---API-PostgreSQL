export class CreateSubCompanyDto {
    id: number;
    maincompanyid: number;
    subcompanyname: string;
    subcompanystatus: string;
    createdat:Date;
    updatedat:Date;
    companyaddress: string;
    contactnum: string;
}
