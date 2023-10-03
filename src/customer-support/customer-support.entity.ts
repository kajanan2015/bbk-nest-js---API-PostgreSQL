
import { CompaniesEntity } from 'src/companies/companies.entity'
import { User } from 'src/user/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { InquiryType } from './inquiry-type/inquiry-type.entity'
import { Department } from 'src/departments/department.entity';

export enum CustomerSupportStatus {
  NEW = 'new',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REASSIGN = 'reassign',
  REJECTED = 'rejected',
  INPROGRESS = 'inprogress',
  ONHOLD = 'onhold',
  PENDINGCUSTOMERACTION = 'pendingcustomeraction'
}

export enum Historydatatype {
  SUPPORTDETAILS = 'support details',
  CUSTOMERSUPPORT = 'customer support'
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

  @OneToMany(() => CustomerSupportHistory, customerSupportHistory => customerSupportHistory.customerSupportDetails, { cascade: true })
  customerSupportHistory: CustomerSupportHistory[];
}

@Entity('customer_support')
export class CustomerSupport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: 'assigner_comment', length: 300, nullable: true, default: () => null })
  assignerComment: string;

  @Column("varchar", { name: 'assignee_comment', length: 300, nullable: true, default: () => null })
  assigneeComment: string;

  @ManyToOne(() => CustomerSupportDetails, inquiry => inquiry.customerSupport)
  @JoinColumn({ name: 'customer_support_details_id' })
  customerSupportDetails: CustomerSupportDetails;

  @Column('enum', { enum: CustomerSupportStatus, default: CustomerSupportStatus.NEW, comment: 'new/inprogress/pending/reassign/resolved/rejected/onhold/pendingcustomeraction' })
  status: CustomerSupportStatus;

  @Column("timestamp", { name: "assignee_commented_at", nullable: true, default: () => null })
  assigneeCommentedAt: Date;

  @Column("timestamp", { name: "assign_date", nullable: true, default: () => null })
  assignDate: Date;

  @ManyToOne(() => User, user => user.customerSupportAssignedBy)
  @JoinColumn({ name: 'assigned_by' })
  assignedBy: User;

  @ManyToOne(() => User, user => user.customerSupportAssignedTo)
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User;

  @ManyToOne(() => Department, dep => dep.customer)
  @JoinColumn({ name: 'assigned_department' })
  assignedDepartment: Department;

  @OneToMany(() => CustomerSupportHistory, customerSupportHistory => customerSupportHistory.customerSupport, { cascade: true })
  customerSupportHistory: CustomerSupportHistory[];
}

@Entity('customer_support_history')
export class CustomerSupportHistory {
  @PrimaryGeneratedColumn({ type: "int", name: "customer_support_history_id", unsigned: true })
  id: number;

  @Column("enum", { name: "history_data_type", enum: Historydatatype, default: Historydatatype.CUSTOMERSUPPORT, comment: "support details/customer support" })
  historyDataType: Historydatatype;

  @Column({ type: "text", name: "history_data" })
  historyData: String;

  @ManyToOne(() => User, user => user.customerSupportCreatedBy)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => User, user => user.customerSupportUpdatedBy)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updatedAt: Date;

  @ManyToOne(() => CustomerSupportDetails, customerSupport => customerSupport.customerSupportHistory)
  @JoinColumn({ name: 'customer_support_details_id' })
  customerSupportDetails: CustomerSupportDetails;

  @ManyToOne(() => CustomerSupport, customerSupport => customerSupport.customerSupportHistory)
  @JoinColumn({ name: 'customer_support_id' })
  customerSupport: CustomerSupport;
}