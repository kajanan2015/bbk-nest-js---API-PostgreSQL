import { User } from "src/user/user.entity";
export class CreateCompanyPaymentDto {
    id: number;
    sendedContact: string;
    linkstatus: Boolean;
    invoiceNumber: string;
    issuedDate: Date;
    issuedBy: User;
}
