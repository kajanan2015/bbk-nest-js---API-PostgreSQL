import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('bank_name')
export class BankName {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bank_Name: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.bankName, ({ cascade: true }))
    bank_name: EmployeeModule[];

}