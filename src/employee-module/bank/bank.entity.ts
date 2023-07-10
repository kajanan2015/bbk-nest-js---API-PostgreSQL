import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('bank')
export class Bank {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankName: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    sortCode: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.bankName, ({ cascade: true }))
    employee: EmployeeModule;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

}