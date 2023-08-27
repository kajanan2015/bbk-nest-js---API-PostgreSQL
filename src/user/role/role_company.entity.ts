import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleOperation } from './role_operation/role_company_operation.entity';
import { OperationRoleCompany } from './role_operation/role_company_operation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from '../user.entity';
@Entity('company_role')
export class RoleCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true })
    role_name: string;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
    updated_at: Date;

    @OneToMany(() => OperationRoleCompany, rolecompany => rolecompany.companyrelatedrole, { cascade: true })
    assignedoperation: OperationRoleCompany[];

    @ManyToOne(() => CompaniesEntity, company => company.assignedrole)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @ManyToOne(() => User, created => created.rolecompanyassignedby)
    @JoinColumn({ name: 'assigned_by' })
    created_by: User;

    @ManyToOne(() => User, updated => updated.rolecompanyupdatedby)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;
}
