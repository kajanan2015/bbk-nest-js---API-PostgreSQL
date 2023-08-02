
import { CompaniesEntity } from 'src/companies/companies.entity'
import { User } from 'src/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { InquiryType } from './inquiry-type/inquiry-type.entity'
import { Department } from 'src/departments/department.entity';

export enum CustomerSupportStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
  INPROGRESS = 'inprogress',
  ONHOLD = 'onhold',
  PENDINGCUSTOMERACTION = 'pendingcustomeraction'
}

@Entity('customer_support_details')
export class CustomerSupportDetails {
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

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User, user => user.customersupportdetails)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => CustomerSupport, customerSupport => customerSupport.customerSupportDetails, { cascade: true })
  customerSupport: CustomerSupport[];
}

@Entity('customer_support')
export class CustomerSupport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: 'assigner_comment', length: 300, nullable: true, default: () => null })
  assignerComment: string;

  @ManyToOne(() => CustomerSupportDetails, inquiry => inquiry.customerSupport)
  @JoinColumn({ name: 'customer_support_details_id' })
  customerSupportDetails: CustomerSupportDetails;

  @Column('enum', { enum: CustomerSupportStatus, default: CustomerSupportStatus.PENDING, comment: 'pending/resolved/rejected/inprogress/onhold/pendingcustomeraction' })
  status: CustomerSupportStatus;

  @Column("timestamp", { name: "resolved_at", nullable: true, default: () => null })
  resolvedAt: Date;

  @OneToOne(() => User, user => user.customersupportResolved)
  @JoinColumn({ name: 'resolved_by' })
  resolvedBy: User;

  @Column("timestamp", { name: "assign_date", nullable: true, default: () => null })
  assignDate: Date;

  @OneToOne(() => User, user => user.customerSupportAssignedBy)
  @JoinColumn({ name: 'assigned_by' })
  assignedBy: User;

  @OneToOne(() => User, user => user.customerSupportAssignedTo)
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User;

  @OneToOne(() => Department, dep => dep.customer)
  @JoinColumn({ name: 'assigned_department' })
  assignedDepartment: Department;
}
