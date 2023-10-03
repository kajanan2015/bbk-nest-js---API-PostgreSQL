import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";

export class CreateCustomizeTableDto {
    id: number;
    tableId: string;
    user: User[];
    company: CompaniesEntity[];
    visibilityModel: string
}
