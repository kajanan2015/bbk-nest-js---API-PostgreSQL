
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
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

  @Column("timestamp", { name: "startDate", default: () => "CURRENT_TIMESTAMP" })
  startDate: Date;

  @Column("timestamp", { name: "endDate", nullable: true, default: () => null })
  endDate: Date;

  @ManyToOne(() => User, user => user.companydocumentcreate)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

}
