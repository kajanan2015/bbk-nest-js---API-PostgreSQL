import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleCompany } from '../role_company.entity';
import { User } from 'src/user/user.entity';

export enum RoleOperation {
    ALL = 'all',
    CREATE = 'create',
    UPDATE = 'update',
    READ = 'read',
    DELETE = 'delete',
    NO = 'no access'
}



@Entity('company_role_operation')
export class OperationRoleCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { name: "role_operation", enum: RoleOperation, default: RoleOperation.NO, comment: "all/create/read/update/delete/no access" })
    roleOperation: RoleOperation;

    @Column("timestamp", { name: "assign_at", default: () => "CURRENT_TIMESTAMP" })
    assign_at: Date;

    @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
    updated_at: Date;

    @ManyToOne(() => RoleCompany, role => role.assignedoperation)
    @JoinColumn({ name: 'role_id_company' })
    companyrelatedrole: RoleCompany;

    @ManyToOne(() => User, create => create.roleoperationassignedby)
    @JoinColumn({ name: 'assigned_by' })
    created_by: User;

    @ManyToOne(() => User, update => update.roleoperationupdatedby)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;
}