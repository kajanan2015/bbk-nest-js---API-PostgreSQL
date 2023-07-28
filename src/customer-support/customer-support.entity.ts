
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

  @Column("varchar", { name: 'full_name', length: 300, nullable: true, default: () => null })
  fullName: string;

  @Column("varchar", { name: 'company_name', length: 300, nullable: true, default: () => null })
  companyName: string;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  email: string;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  phone: string;

  @ManyToOne(() => InquiryType, inquiry => inquiry.customerSupport)
  @JoinColumn({ name: 'inquiry_type' })
  inquiryType: InquiryType;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  message: string;

  @ManyToOne(() => CompaniesEntity, company => company.customerSupport)
  @JoinColumn({ name: 'company_id' })
  companyId: CompaniesEntity;

  @Column('enum', { enum: CustomerSupportStatus, default: CustomerSupportStatus.PENDING, comment: 'pending/resolved/rejected/inprogress/onhold/pendingcustomeraction' })
  status: CustomerSupportStatus;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("timestamp", { name: "resolved_at", nullable: true, default: () => null })
  resolvedAt: Date;

  @ManyToOne(() => User, user => user.customersupport)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
}
