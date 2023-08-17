
import { CompaniesEntity } from 'src/companies/companies.entity'
import { CustomerSupport } from 'src/customer-support/customer-support.entity';
import { EmployeeDepartments } from 'src/employee-module/employee_departments/employee_departments.entity';
import { User } from 'src/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm'

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "department_id", length: 300, nullable: true, default: () => null })
    departmentId: string;

    @Column("varchar", { name: "department_name", length: 300, nullable: true, default: () => null })
    departmentName: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @ManyToOne(() => CompaniesEntity, company => company.department)
    @JoinColumn({ name: 'company_id' })
    companyId: CompaniesEntity;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.customersupportCreated)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User, user => user.customersupportUpdated)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;

    @ManyToMany(() => User, user => user.departments)
    @JoinTable({ name: 'department_user' })
    users: User[];

    @OneToMany(() => CustomerSupport, customerSupport => customerSupport.assignedDepartment, { cascade: true })
    customer: CustomerSupport[];

    @OneToMany(() => EmployeeDepartments, department => department.department, { cascade: true })
    employeeDepartments: EmployeeDepartments[];
}
