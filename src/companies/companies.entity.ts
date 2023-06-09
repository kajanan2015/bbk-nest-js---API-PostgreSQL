
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { CompanyDocument } from 'src/company-document/company-document.entity';
import { User } from 'src/user/user.entity';
import { country } from './country.entity';
import { companytype } from './companytype.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
@Entity('company')
export class CompaniesEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  // @Column("int",{ nullable: true ,  default: () => null })
  // companyType: number | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  companyName: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  companyEmail: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  companyPhone: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  website: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  number: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  street: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  city: string | null;

  // @Column("int",{ nullable: true , default: () => null })
  // country: number | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  postalCode: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  vat: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  registrationNumber: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  regAddressNo: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  regAddressStreet: string | null;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  regAddressCity: string | null;

  // @Column("int",{ nullable: true , default: () => null })
  // regAddressCountry: number;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  regAddressPostalCode: string | null;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  companyLogo: string;

  @Column("varchar", { length: 300, nullable: true, default: () => null })
  companyLogoThumb: string;

  @Column("varchar", { length: 100, nullable: true, default: () => null })
  companyCode: string;

  @Column("int", { nullable: true, default: () => null })
  createdBy: number;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @Column("timestamp", { name: "scheduleddeactivation", default: null })
  scheduleddeactivation: Date;

  @Column("varchar", { name: "deactivationreason", default: null })
  deactivationreason: string;

  @Column("varchar", { name: "deactivationmethod", default: null, comment: 'scheduled/immediate' })
  deactivationmethod: string;

  @Column("timestamp", { name: "deactivatedtime", default: null })
  deactivatedtime: Date;

  @Column("int", { name: "deactivatedby", default: null })
  deactivatedby: number;

  @Column("bigint", { default: 0, comment: ' 0-pending, 1-active, 2-deactivate' })
  compstatus: number;

  @Column("varchar", { length: 100, nullable: true, default: () => null })
  billing: string;

  @Column("varchar", { length: 100, nullable: true, default: "maincompany" })
  companyIdentifier: string;

  @Column("varchar", { nullable: true, length: 250, default: () => null })
  code: string;

  @OneToMany(() => CompanyDocument, companyDocuments => companyDocuments.company, { cascade: true })
  documents: CompanyDocument[];

  @ManyToOne(() => CompaniesEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentCompanyId' })
  mainCompany: CompaniesEntity;

  get parentCompanyId(): number {
    return this.mainCompany ? this.mainCompany.id : 0;
  }

  set parentCompanyId(value: number) {
  }


  @ManyToMany(() => PagePermissionEntity, (page) => page.companies)
  @JoinTable()
  pages: PagePermissionEntity[];

  @ManyToMany(() => User, user => user.companies)
  @JoinTable()
  users: User[];

  @ManyToOne(() => country, country => country.companyCountry)
  @JoinColumn({ name: 'country' })
  country: country;

  @ManyToOne(() => country, countryreg => countryreg.companyRegAddressCountry)
  @JoinColumn({ name: 'regAddressCountry' })
  regAddressCountry: country;

  @ManyToOne(() => companytype, companytype => companytype.companyType)
  @JoinColumn({ name: 'companyType' })
  companyType: companytype;

  @OneToMany(() => EmployeeModule, employeemodule => employeemodule.company, ({ cascade: true }))
  employedetails: EmployeeModule[];

  @ManyToMany(() => Createmodule, module => module.company)
  @JoinTable()
  module: Createmodule[];

  @ManyToMany(() => Moduledetailsofpackage, packagedetails => packagedetails.company)
  @JoinTable()
  package: Moduledetailsofpackage[];

  @Column("tinyint", { default: 3, comment: ' 1-agree, 2-disagree, 3-pending' })
  contractagreement: number;
}
