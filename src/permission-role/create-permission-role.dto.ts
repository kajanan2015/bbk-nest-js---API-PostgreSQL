import { User } from "src/user/user.entity";
export class CreatePermissionRoleDto {
    id: number;
    roleName: string;
    rolesStatus: Boolean;
    assignCompany:number;
    createdat:Date;
    updatedat:Date;
    employees: User[];
}
