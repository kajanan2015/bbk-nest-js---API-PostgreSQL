import { EmployeeModule } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompaniesEntity } from "src/companies/companies.entity";
import { CompanyWorkPattern } from "src/company-work-pattern/company-work-pattern.entity";
@Entity()
export class EmployeeDataHistory {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @ManyToOne(() => EmployeeModule, employee => employee.editHistory)
    @JoinColumn({ name: 'employee' })
    employee: EmployeeModule;

    @ManyToOne(() => CompaniesEntity, company => company.editHistory)
    @JoinColumn({ name: 'company' })
    company: CompaniesEntity;


    @Column("varchar", {  length: 250, nullable: true, default: () => null })
    type: string | null;

    @Column("text", { nullable: true, default: () => null })
    data: string | null;

    @ManyToOne(() => User, user => user.empEditedUser)
    @JoinColumn({ name: 'editedBy' })
    editedBy: User;

    @ManyToOne(() => User, user => user.empCreatedUser)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;

    @Column("timestamp", { name: "startDate", default: () => "CURRENT_TIMESTAMP" })
    startDate: Date;

    @Column("timestamp", { name: "endDate", default: null })
    endDate: Date;

    @Column("timestamp", { name: "editedDate", default: () => "CURRENT_TIMESTAMP"})
    editedDate: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @Column({ type: 'boolean', default: false })
    active: boolean;

    @ManyToOne(() => CompanyWorkPattern, pattern => pattern.editHistory)
    @JoinColumn({ name: 'workpattern' })
    workpattern: CompanyWorkPattern;
}
