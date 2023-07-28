
import { CompaniesEntity } from 'src/companies/companies.entity'
import { User } from 'src/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "department_name", length: 300, nullable: true, default: () => null })
    departmentName: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @ManyToOne(() => CompaniesEntity, company => company.department)
    @JoinColumn({ name: 'company_id' })
    companyId: CompaniesEntity;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.customersupport)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User, user => user.customersupport)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;
}
