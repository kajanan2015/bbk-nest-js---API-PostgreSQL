import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('payment_frequency')
export class PaymentFrequency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    payment_Frequency_Type: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.paymentFrequency, ({ cascade: true }))
    payment_frequency: EmployeeModule[];

}