
import { CompaniesEntity } from 'src/companies/companies.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InquiryType } from './inquiry-type/inquiry-type.entity';
@Entity()
export class CustomerSupport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InquiryType, inquiry => inquiry.customerSupport)
  @JoinColumn({ name: 'inquiryType' })
  inquiryType: InquiryType;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  message: string;

  @ManyToOne(() => CompaniesEntity, company => company.customerSupport)
  @JoinColumn({ name: 'companyId' })
  companyId: CompaniesEntity;

  @Column({ type: 'boolean', default: true })
  status: Boolean;

  @Column("timestamp", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "resolvedAt", nullable: true, default: () => null })
  resolvedAt: Date;

  @ManyToOne(() => User, user => user.customersupport)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;
}
