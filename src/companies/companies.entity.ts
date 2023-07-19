
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { User } from 'src/user/user.entity';

import { country } from './country/country.entity';
import { companytype } from './company Type/companytype.entity';
import { Employee } from 'src/employee-module/employee-module.entity';

import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
import { Paymenttype } from 'src/createpackage/paymenttype.entity';
import { CustomizeTable } from 'src/customize-table/customize-table.entity';
import { Companypackagerow } from 'src/companypackagerow/companypackagerow.entity';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { VehicleTypeEntity } from 'src/vehicle-type/vehicle-type.entity';
// @Entity('company_k')
// export class CompaniesEntityssss {
//   @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
//   id: number;

//   // // @Column("int",{ nullable: true ,  default: () => null })
//   // // companyType: number | null;

//   // // @Column("int",{ nullable: true , default: () => null })
//   // // country: number | null;

//   // // @Column("int",{ nullable: true , default: () => null })
//   // // regAddressCountry: number;
//   // @Column("varchar", { nullable: true, length: 250, default: () => null })
//   // code: string;

//   // @Column("tinyint", { default: 0, comment: ' 0-trial,1-12 month, 2-36 month' })
//   // contractagreement: number;

//   // @Column("timestamp", { name: "validityperiod", default: null })
//   // validityperiod: Date;

//   // @Column("varchar", { length: 100, nullable: true, default: () => null })
//   // paymentlinkotp: string;

// }



export enum Companyidentifier{
  MAIN='maincompany',
  SUB='subcompany'
}

export enum Companystatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  DEACTIVATE = 'deactivate'
}

export enum Deactivationmethod {
  SCHEDULE = 'schedule',
  IMMEDIATE = 'immediate',
  NOTDELETE = 'not deleted yet'
}

export enum Historydatatype{
  COMPANY='company initial data',
  COMPANYINFO='company info'
}

@Entity('company')
export class CompaniesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "company_id", unsigned: true })
  id: number;

  @Column("varchar", { length: 250 })
  company_code: string | null;

  @Column("varchar", { length: 10, comment: "to declare employee id" })
  company_prefix: string | null;

  @Column("int", { nullable: true, default: () => null })
  created_by: number;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => CompaniesEntityinfo, company => company.mainCompany, ({ cascade: true }))
  parentCompany: CompaniesEntityinfo[];

  @OneToMany(() => CompaniesEntityinfo, company => company.company, ({ cascade: true }))
  linkedcompany: CompaniesEntityinfo[];


  @OneToMany(() => CompanyWorkPattern, workpattern => workpattern.company, ({ cascade: true }))
  workpattern: CompanyWorkPattern[];

  @OneToMany(() => EmployeeDataHistory, compDataHistory => compDataHistory.company, { cascade: true })
  editHistory: EmployeeDataHistory[];


  @OneToMany(() => VehicleTypeEntity, vehicletype => vehicletype.company, ({ cascade: true }))
  vehicleentity: VehicleTypeEntity[];


  @OneToMany(() => CustomizeTable, customizeTable => customizeTable.company, ({ cascade: true }))
  usertablecompany: CustomizeTable[];

  @OneToMany(() => Companypackagerow, companypackagerow => companypackagerow.company, ({ cascade: true }))
  companypackagerow: Companypackagerow[];

  @OneToMany(() => Employee, employeemodule => employeemodule.company, ({ cascade: true }))
  employedetails: Employee[];

  @OneToMany(() => CompanyDocument, companyDocuments => companyDocuments.company, { cascade: true })
  documents: CompanyDocument[];

  

  @ManyToMany(() => User, user => user.companies)
  @JoinTable()
  users: User[];


  @ManyToMany(() => PagePermissionEntity, (page) => page.companies)
  @JoinTable()
  pages: PagePermissionEntity[];

  @ManyToMany(() => Createmodule, module => module.company)
  @JoinTable()
  module: Createmodule[];

  @ManyToMany(() => Moduledetailsofpackage, packagedetails => packagedetails.company)
  @JoinTable()
  package: Moduledetailsofpackage[];

  @OneToMany(() => CompaniesHistorydata, historydata => historydata.company, ({ cascade: true }))
  historydata: CompaniesHistorydata[];

}

@Entity('company_info')
export class CompaniesEntityinfo {
  @PrimaryGeneratedColumn({ type: "int", name: "company_info_id", unsigned: true })
  company_info_id: number;

  @Column("varchar", { name: "company_name", length: 250 })
  companyName: string | null;

  @Column("varchar", { name: "company_contact_email", length: 250, })
  companyEmail: string | null;

  @Column("varchar", { name: "company_contact_phone", nullable: true, length: 250, default: () => null })
  companyPhone: string | null;

  @Column("varchar", { name: "company_contact_website", nullable: true, length: 250, default: () => null })
  website: string | null;

  @Column("varchar", { name: "company_place_number", nullable: true, length: 250, default: () => null })
  number: string | null;

  @Column("varchar", { name: "company_place_street", nullable: true, length: 250, default: () => null })
  street: string | null;

  @Column("varchar", { name: "company_place_city", nullable: true, length: 250, default: () => null })
  city: string | null;

  @ManyToOne(() => country, country => country.companyCountry)
  @JoinColumn({ name: 'company_contact_country' })
  country: country;

  @ManyToOne(() => companytype, companytype => companytype.companyType)
  @JoinColumn({ name: 'company_type'})
  companyType: companytype;


  @Column("varchar", { name: "company_place_postal_code", nullable: true, length: 250, default: () => null })
  postalCode: string | null;

  @Column("varchar", { name: "company_vat_number", nullable: true, length: 250, default: () => null })
  vat: string | null;

  @Column("varchar", { name: "company_registration_number", nullable: true, length: 250, default: () => null })
  registrationNumber: string | null;

  @Column("varchar", { name: "company_registration_address_number", nullable: true, length: 250, default: () => null })
  regAddressNo: string | null;

  @Column("varchar", { name: "company_registration_address_street", nullable: true, length: 250, default: () => null })
  regAddressStreet: string | null;

  @Column("varchar", { name: "comapny_registration_address_city", nullable: true, length: 250, default: () => null })
  regAddressCity: string | null;

  @Column("varchar", { name: "comapny_registration_postal_code", nullable: true, length: 250, default: () => null })
  regAddressPostalCode: string | null;


  @ManyToOne(() => country, countryreg => countryreg.companyRegAddressCountry)
  @JoinColumn({ name: 'company_registartion_address_country' })
  regAddressCountry: country;

  @Column("varchar", { name: "company_logo", length: 300, nullable: true, default: () => null })
  companyLogo: string;

  @Column("varchar", { name: "company_logo_thumbnail", length: 300, nullable: true, default: () => null })
  companyLogoThumb: string;

  @Column("varchar", { name: "deactivation_reason", default: null })
  deactivationreason: string;

  @Column("enum", { name: "deactivation_method", enum: Deactivationmethod, default: Deactivationmethod.NOTDELETE, comment: 'scheduled/immediate/not deleted' })
  deactivationmethod: Deactivationmethod;

  @Column('enum',{name:"company_status",enum:Companystatus,default:Companystatus.TRIAL,comment:'trial/active/decativate'})
  company_status:Companystatus;

  @Column("enum", { name:"company_identifier",enum:Companyidentifier,default:Companyidentifier.MAIN,comment:"maincompany/sucompany" })
  companyIdentifier: Companyidentifier;


  @ManyToOne(() => CompaniesEntity, parentcompany => parentcompany.parentCompany)
  @JoinColumn({ name: 'parent_company_id' })
  mainCompany: CompaniesEntity;

  @ManyToOne(() => CompaniesEntity, parentcompany => parentcompany.linkedcompany)
  @JoinColumn({ name: 'company_id' })
  company: CompaniesEntity;

  @Column("int", { nullable: true, default: () => null })
  created_by: number;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("int", { nullable: true, default: () => null })
  updated_by: number;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updated_at: Date;

  @Column('timestamp',{name:'start_date', default: () => "CURRENT_TIMESTAMP"})
  start_date:Date;

  @Column('timestamp',{name:'end_date',default:null,nullable:true})
  end_date:Date;

  @ManyToOne(() => Paymenttype, paymenttype => paymenttype.paymentType)
  @JoinColumn({ name: 'billing' })
  billing: Paymenttype;

  @OneToMany(() => CompaniesHistorydata, historydata => historydata.companyinfo, ({ cascade: true }))
  history: CompaniesHistorydata[];

}

@Entity('company_data_history')
export class CompaniesHistorydata{
  @PrimaryGeneratedColumn({ type: "int", name: "company_history_id", unsigned: true })
  id: number;

  @Column("enum", { name: "history_data_type",enum:Historydatatype,default:Historydatatype.COMPANY,comment:"company initial data/company info"})
  history_data_type: Historydatatype;

  @Column( {type:"text", name: "history_data"})
  history_data:  String;

  @Column("int", { nullable: true, default: () => null })
  created_by: number;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("int", { nullable: true, default: () => null })
  updated_by: number;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updated_at: Date;

  @ManyToOne(() => CompaniesEntityinfo, company => company.history)
  @JoinColumn({ name: 'company_info_id' })
  companyinfo: CompaniesEntityinfo;

  @ManyToOne(() => CompaniesEntity, company => company.historydata,)
  @JoinColumn({ name: 'company_id' })
  company: CompaniesEntity;

  @Column('timestamp',{nullable:true,name:'start_date', default: () => "CURRENT_TIMESTAMP"})
  start_date:Date;
}