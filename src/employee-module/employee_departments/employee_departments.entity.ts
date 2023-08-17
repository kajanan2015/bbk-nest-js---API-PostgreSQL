import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeInfo } from "../employee-module.entity";
import { Department } from "src/departments/department.entity";

@Entity('employee_departments')
export class EmployeeDepartments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EmployeeInfo, employeeInfo => employeeInfo.department)
    @JoinColumn({ name: 'employee_info_id' })
    empInfoId: EmployeeInfo;

    @ManyToOne(() => Department, department => department.employeeDepartments)
    @JoinColumn({ name: 'department' })
    department: Department;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date | null;

    @Column({ type: 'boolean', default: true })
    status: Boolean;
}