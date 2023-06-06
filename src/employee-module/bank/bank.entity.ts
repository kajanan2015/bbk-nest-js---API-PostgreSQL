import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('bank')
export class Bank {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankName: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.bankName, ({ cascade: true }))
    employee: EmployeeModule;

}