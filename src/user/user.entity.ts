
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { TripEntity } from 'src/trip/trip.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { CompaniesHistorydata } from 'src/companies/companies.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompanyPayment } from 'src/company-payment/company-payment.entity';
import { Employee, EmployeeInfo } from 'src/employee-module/employee-module.entity';
import { CustomizeTable } from 'src/customize-table/customize-table.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { CustomerSupport, CustomerSupportDetails, CustomerSupportHistory } from 'src/customer-support/customer-support.entity';
import { Department } from 'src/departments/department.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { Companypackageassignhistory } from 'src/companypackagerow/companypackagerow.entity';
import { PaymentLinkData } from 'src/payment/payment_link_otp/payment_link.entity';
import { EmployeeAssignWorkPattern } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { EmployeeAssignWorkPatternInfo } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { RoleCompany } from './role/role_company.entity';
import { OperationRoleCompany } from './role/role_operation/role_company_operation.entity';
import { CompanyWiseThemeCustomize } from 'src/company-wise-theme-customize/company-wise-theme-customize.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 250, default: () => null })
  firstName: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  middleName: string;

  @Column({ nullable: true, length: 250, default: () => null })
  lastName: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  employeeNumber: string | null;

  @Column({ nullable: true, default: () => null })
  dob: Date | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  address: string | null;

  @Column({ nullable: true, length: 250, default: () => null })
  email: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  phone: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  nationality: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  country: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  profilePic: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  profilePicThumb: string | null;

  @Column({ nullable: true, length: 250, default: () => null })
  password: string | null;

  @Column("varchar", { name: "utype", default: () => "'USER'", length: 50 })
  uType: string | null;

  @Column({ type: 'boolean', default: true })
  status: Boolean | null;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date | null;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date | null;

  @ManyToMany(() => PermissionRoleEntity, (role) => role.employees)
  @JoinTable()
  roles: PermissionRoleEntity[];

  @OneToMany(() => TripEntity, trip => trip.jobuser, { cascade: true })
  jobdata: TripEntity[]

  @ManyToMany(() => CompaniesEntity, company => company.users)
  companies: CompaniesEntity[];

  @ManyToMany(() => Department, department => department.users)
  departments: Department[];

  @OneToMany(() => Createmodule, cretedby => cretedby.modulecreate, { cascade: true })
  modulecreatedby: Createmodule[];

  @OneToMany(() => Createmodule, updatedby => updatedby.moduleupdate, { cascade: true })
  moduleupdateby: Createmodule[];

  @OneToMany(() => Createpackage, cretedby => cretedby.pkgcreate, { cascade: true })
  pkgcreatedby: Createpackage[];

  @OneToMany(() => Createpackage, updatedby => updatedby.pkgupdate, { cascade: true })
  pkgupdateby: Createpackage[];

  @OneToMany(() => CompanyPayment, updatedby => updatedby.issuedBy, { cascade: true })
  issueByuser: CompanyPayment[];

  @OneToMany(() => Employee, employee => employee.created_by, { cascade: true })
  empCreatedUser: Employee[];

  @OneToMany(() => Employee, employee => employee.updated_by, { cascade: true })
  empUpdatedUser: Employee[];

  @OneToMany(() => EmployeeInfo, employee => employee.created_by, { cascade: true })
  empInfoCreatedUser: EmployeeInfo[];

  @OneToMany(() => EmployeeInfo, employee => employee.updated_by, { cascade: true })
  empInfoUpdatedUser: EmployeeInfo[];

  @OneToMany(() => CustomizeTable, customizeTable => customizeTable.user, { cascade: true })
  tableUser: CustomizeTable[];

  // @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.editedBy,{cascade:true})
  // empEditedUser:CustomizeTable[];

  @OneToMany(() => EmployeeDataHistory, empDataHistory => empDataHistory.updated_by, { cascade: true })
  empHistoryUpdatedBy: EmployeeDataHistory[];

  @OneToMany(() => EmployeeDataHistory, empDataHistory => empDataHistory.created_by, { cascade: true })
  empHistoryCreatedBy: EmployeeDataHistory[];

  @OneToMany(() => EmployeeDocument, document => document.created_by, { cascade: true })
  empDocEditedUser: EmployeeDocument[];

  // @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.createdBy,{cascade:true})
  // empCreatedUser:CustomizeTable[];

  @Column({ type: 'boolean', default: false })
  activate: Boolean | null;

  @Column("timestamp", { name: "activated_time", nullable: true, default: () => null })
  activated_time: Date | null;

  @Column({ type: 'boolean', default: false })
  firsttimepasswordchange: Boolean | null;


  @OneToMany(() => CompanyWorkPattern, cretedby => cretedby.patterncreate, { cascade: true })
  patterncreateby: CompanyWorkPattern[];

  @OneToMany(() => CompanyWorkPattern, updatedby => updatedby.patternupdate, { cascade: true })
  patternupdatedby: CompanyWorkPattern[];

  @OneToMany(() => CompaniesEntity, company => company.created_by, { cascade: true })
  companymainusercreate: CompaniesEntity[];

  @OneToMany(() => CompaniesEntityinfo, company => company.created_by, { cascade: true })
  companyinfousercreate: CompaniesEntityinfo[];

  @OneToMany(() => CompaniesHistorydata, company => company.created_by, { cascade: true })
  companyhistorycreate: CompaniesHistorydata[];

  @OneToMany(() => CompaniesEntityinfo, company => company.updated_by, { cascade: true })
  companyinfouserupdate: CompaniesEntityinfo[];

  @OneToMany(() => CompaniesHistorydata, company => company.updated_by, { cascade: true })
  companyhistoryupdate: CompaniesHistorydata[];

  @OneToMany(() => CompanyDocument, company => company.createdBy, { cascade: true })
  companydocumentcreate: CompanyDocument[];

  @OneToMany(() => CustomerSupportDetails, customerSupport => customerSupport.createdBy, { cascade: true })
  customersupportdetails: CustomerSupportDetails[];

  @OneToMany(() => CustomerSupport, customerSupport => customerSupport.assignedBy, { cascade: true })
  customerSupportAssignedBy: CustomerSupport[];

  @OneToMany(() => Department, department => department.createdBy, { cascade: true })
  customersupportCreated: Department[];

  @OneToMany(() => Department, department => department.createdBy, { cascade: true })
  customersupportUpdated: Department[];

  @OneToMany(() => CustomerSupport, customerSupport => customerSupport.assignedBy, { cascade: true })
  customerSupportAssignedTo: CustomerSupport[];

  @OneToMany(() => CustomerSupportHistory, company => company.createdBy, { cascade: true })
  customerSupportCreatedBy: CustomerSupportHistory[];

  @OneToMany(() => CustomerSupportHistory, company => company.updatedBy, { cascade: true })
  customerSupportUpdatedBy: CustomerSupportHistory[];

  @OneToMany(()=>Companypackagerow, company=>company.created_by,{cascade:true})
  packageassignuser:Companypackagerow[];

  @OneToMany(()=>Companypackageassignhistory, company=>company.created_by,{cascade:true})
  companyassignpackagehistorycreate:Companypackageassignhistory[];

  @OneToMany(()=>Companypackageassignhistory, company=>company.updated_by,{cascade:true})
  companyassignpackagehistoryupdate:Companypackageassignhistory[];

  @OneToMany(()=>PaymentLinkData, paymentdata=>paymentdata.created_by,{cascade:true})
  companypaymentlinkcreate:PaymentLinkData[];

  @OneToMany(()=>EmployeeAssignWorkPattern, assignpattern=>assignpattern.created_by,{cascade:true})
  assignworkpatterncreatedby:EmployeeAssignWorkPattern[];

  @OneToMany(()=>EmployeeAssignWorkPattern, assignpattern=>assignpattern.updated_by,{cascade:true})
  assignworkpatternupdatedby:EmployeeAssignWorkPattern[];

  @OneToMany(()=>EmployeeAssignWorkPatternInfo, assignpattern=>assignpattern.created_by,{cascade:true})
  assignworkpatterninfocreatedby:EmployeeAssignWorkPatternInfo[];

  @OneToMany(()=>EmployeeAssignWorkPatternInfo, assignpattern=>assignpattern.updated_by,{cascade:true})
  assignworkpatterninfoupdatedby:EmployeeAssignWorkPatternInfo[];

  @OneToMany(()=>RoleCompany, rolecompany=>rolecompany.created_by,{cascade:true})
  rolecompanyassignedby:RoleCompany[];

  @OneToMany(()=>RoleCompany, assignpattern=>assignpattern.updated_by,{cascade:true})
  rolecompanyupdatedby:RoleCompany[];

  @OneToMany(()=>OperationRoleCompany, assignpattern=>assignpattern.created_by,{cascade:true})
  roleoperationassignedby:OperationRoleCompany[];

  @OneToMany(()=>OperationRoleCompany, assignpattern=>assignpattern.updated_by,{cascade:true})
  roleoperationupdatedby:OperationRoleCompany[];

  @OneToMany(()=>CompanyWiseThemeCustomize, assignpattern=>assignpattern.created_by,{cascade:true})
  themedatacreateby:CompanyWiseThemeCustomize[];

  @OneToMany(()=>CompanyWiseThemeCustomize, assignpattern=>assignpattern.updated_by,{cascade:true})
  themedataupdatedby:OperationRoleCompany[];
}
