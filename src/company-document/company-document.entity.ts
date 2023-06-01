
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
@Entity()
export class CompanyDocument {
    @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {  length: 250 })
  documentPath: string;

  @ManyToOne(() => CompaniesEntity, company => company.documents )
  @JoinColumn({ name: 'companyId' })
  company: CompaniesEntity;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;
}
