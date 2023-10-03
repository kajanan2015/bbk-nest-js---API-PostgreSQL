import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeInfo } from "../employee-module.entity";

@Entity('visa_type')
export class VisaType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 30, default: () => null })
    name: string;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @OneToMany(() => EmployeeInfo, employee => employee.visaType, ({ cascade: true }))
    employee: EmployeeInfo;
}