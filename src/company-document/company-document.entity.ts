
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
@Entity()
export class CompanyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 300, default: () => null })
  documentName: string;

  @Column("varchar", { length: 300, default: () => null })
  documentPath: string;

  @ManyToOne(() => CompaniesEntity, company => company.documents)
  @JoinColumn({ name: 'companyId' })
  companyDoc: CompaniesEntity;

  @Column({ type: 'boolean', default: true })
  status: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;
}
