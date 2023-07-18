import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';

@Entity('payment_frequency')
export class PaymentFrequency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    paymentFrequencyType: string;

    @OneToMany(() => EmployeeInfo, employeeInfo => employeeInfo.paymentFrequency, ({ cascade: true }))
    employee: EmployeeInfo[];

}