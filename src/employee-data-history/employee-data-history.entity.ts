import { EmployeeInfo } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompaniesEntity } from "src/companies/companies.entity";

@Entity('employee_data_history')
export class EmployeeDataHistory {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @ManyToOne(() => EmployeeInfo, employee => employee.editHistory)
    @JoinColumn({ name: 'employee' })
    employee: EmployeeInfo;

    @ManyToOne(() => CompaniesEntity, company => company.editHistory)
    @JoinColumn({ name: 'company' })
    company: CompaniesEntity;

    @Column("varchar", { name: 'type', length: 250, nullable: true, default: () => null })
    type: string | null;

    @Column("text", { name: 'data', nullable: true, default: () => null })
    data: string | null;

    @ManyToOne(() => User, user => user.empHistoryCreatedBy)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @Column("timestamp", { name: "created_at", default: null })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.empHistoryUpdatedBy)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    // @Column("timestamp", { name: "startDate", default: () => "CURRENT_TIMESTAMP" })
    // startDate: Date;    

    // @Column("timestamp", { name: "ended_at", default: null })
    // endDate: Date;

    // @Column("timestamp", { name: "editedDate", default: () => "CURRENT_TIMESTAMP"})
    // editedDate: Date;

    // @Column({ type: 'boolean', default: false })
    // active: boolean;

    // @ManyToOne(() => CompanyWorkPattern, pattern => pattern.editHistory)
    // @JoinColumn({ name: 'workpattern' })
    // workpattern: CompanyWorkPattern;
}
