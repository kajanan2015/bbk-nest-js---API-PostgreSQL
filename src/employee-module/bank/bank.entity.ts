import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Entity('bank')
export class Bank {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankName: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    sortCode: string;

    @OneToMany(() => EmployeeInfo, employee => employee.bankName, ({ cascade: true }))
    employee: EmployeeInfo;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @ManyToOne(() => CompaniesEntity, company => company.banks)
    @JoinColumn({ name: "companyId" })
    company: CompaniesEntity;

}