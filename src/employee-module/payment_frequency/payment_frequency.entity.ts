import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeePayrollInfo } from '../employee-module.entity';

@Entity('payment_frequency')
export class PaymentFrequency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    paymentFrequencyType: string;

    @OneToMany(() => EmployeePayrollInfo, employeeInfo => employeeInfo.paymentFrequency, ({ cascade: true }))
    employee: EmployeePayrollInfo[];

}