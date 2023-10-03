import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('customize-table')
export class CustomizeTable {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", {  length: 250, nullable: true, default: () => null })
    tableId: string | null;

    @ManyToOne(() => User, user => user.tableUser)
    @JoinColumn({ name: 'user' })
    user: User;

    @ManyToOne(() => CompaniesEntity, company => company.usertablecompany)
    @JoinColumn({ name: 'company' })
    company: CompaniesEntity;

    @Column("text", { nullable: true, default: () => null })
    visibilityModel: string | null;
}
