
import { CompaniesEntity } from 'src/companies/companies.entity'
import { User } from 'src/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { InquiryType } from './inquiry-type/inquiry-type.entity'

export enum CustomerSupportStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  INPROGRESS = 'inprogress',
  ONHOLD = 'onhold',
  PENDINGCUSTOMERACTION = 'pendingcustomeraction'
}

@Entity('customer_support')
export class CustomerSupport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  fullName: string;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  companyName: string;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  email: string;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  phone: string;

  @ManyToOne(() => InquiryType, inquiry => inquiry.customerSupport)
  @JoinColumn({ name: 'inquiryType' })
  inquiryType: InquiryType;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  message: string;

  @ManyToOne(() => CompaniesEntity, company => company.customerSupport)
  @JoinColumn({ name: 'companyId' })
  companyId: CompaniesEntity;

  @Column('enum', { enum: CustomerSupportStatus, default: CustomerSupportStatus.PENDING, comment: 'pending/resolved/rejected/inprogress/onhold/pendingcustomeraction' })
  status: CustomerSupportStatus;

  @Column("timestamp", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "resolvedAt", nullable: true, default: () => null })
  resolvedAt: Date;

  @ManyToOne(() => User, user => user.customersupport)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;
}
