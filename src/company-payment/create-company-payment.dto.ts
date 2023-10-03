import { User } from "src/user/user.entity";
export class CreateCompanyPaymentDto {
    id: number;
    sendedContact: string;
    paymentLink: string;
    linkstatus: Boolean;
    invoiceNumber: string;
    totalvalue: number;
    issuedDate: Date;
    issuedBy: User;
}
