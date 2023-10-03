import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';

@Entity('employee_designation')
export class EmpDesignation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    designationName: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @OneToMany(() => EmployeeInfo, employee => employee.designation, ({ cascade: true }))
    designation: EmployeeInfo;
}