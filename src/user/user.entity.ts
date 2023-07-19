
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from 'src/permission-role/permission-role.entity';
import { TripEntity } from 'src/trip/trip.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompanyPayment } from 'src/company-payment/company-payment.entity';
import { Employee, EmployeeInfo } from 'src/employee-module/employee-module.entity';
import { CustomizeTable } from 'src/customize-table/customize-table.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true , length: 250, default: () => null })
  firstName: string|null;

  @Column("varchar",{ nullable: true , length: 250, default: () => null })
  middleName: string;

  @Column({ nullable: true , length: 250, default: () => null })
  lastName: string|null;

  @Column("varchar",{ nullable: true , length: 250, default: () => null })
  employeeNumber: string|null;

  @Column({ nullable: true , default: () => null })
  dob: Date|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  address: string|null;

  @Column({ nullable: true , length: 250, default: () => null })
  email: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  phone: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  nationality: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  country: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  profilePic: string|null;

  @Column("varchar", { nullable: true , length: 250, default: () => null })
  profilePicThumb: string|null;

  @Column({ nullable: true , length: 250, default: () => null })
  password: string|null;

  @Column("varchar", { name:"utype", default: () => "'USER'", length: 50 })
  uType: string|null ;

  @Column({ type: 'boolean', default:true})
  status: Boolean|null;
  
  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date|null;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date|null;

  @ManyToMany(() => PermissionRoleEntity, (role) => role.employees)
  @JoinTable()
  roles: PermissionRoleEntity[];

  @OneToMany(()=>TripEntity, trip => trip.jobuser,{cascade:true})
  jobdata:TripEntity[]

  @ManyToMany(() => CompaniesEntity, company => company.users)
  companies: CompaniesEntity[];

  @OneToMany(()=>Createmodule, cretedby => cretedby.modulecreate,{cascade:true})
  modulecreatedby:Createmodule[];

  @OneToMany(()=>Createmodule, updatedby => updatedby.moduleupdate,{cascade:true})
  moduleupdateby:Createmodule[];

  @OneToMany(()=>Createpackage, cretedby => cretedby.pkgcreate,{cascade:true})
  pkgcreatedby:Createpackage[];

  @OneToMany(()=>Createpackage, updatedby => updatedby.pkgupdate,{cascade:true})
  pkgupdateby:Createpackage[];

  @OneToMany(()=>CompanyPayment, updatedby => updatedby.issuedBy,{cascade:true})
  issueByuser:CompanyPayment[];

  @OneToMany(()=>Employee, employee => employee.created_by,{cascade:true})
  empCreatedUser:Employee[];

  @OneToMany(()=>Employee, employee => employee.updated_by,{cascade:true})
  empUpdatedUser:Employee[];

  @OneToMany(()=>EmployeeInfo, employee => employee.created_by,{cascade:true})
  empInfoCreatedUser:EmployeeInfo[];

  @OneToMany(()=>EmployeeInfo, employee => employee.updated_by,{cascade:true})
  empInfoUpdatedUser:EmployeeInfo[];

  @OneToMany(()=>CustomizeTable, customizeTable => customizeTable.user,{cascade:true})
  tableUser:CustomizeTable[];

  // @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.editedBy,{cascade:true})
  // empEditedUser:CustomizeTable[];

  @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.updated_by,{cascade:true})
  empHistoryUpdatedBy:EmployeeDataHistory[];

  @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.created_by,{cascade:true})
  empHistoryCreatedBy:EmployeeDataHistory[];

  @OneToMany(()=>EmployeeDocument, document => document.created_by,{cascade:true})
  empDocEditedUser:EmployeeDocument[];

  // @OneToMany(()=>EmployeeDataHistory, empDataHistory => empDataHistory.createdBy,{cascade:true})
  // empCreatedUser:CustomizeTable[];

  @Column({ type: 'boolean', default:false})
  activate: Boolean|null;

  @Column("timestamp", { name: "activated_time", nullable:true, default: () => null })
  activated_time: Date|null;

  @Column({ type: 'boolean', default:false})
  firsttimepasswordchange: Boolean|null;


  @OneToMany(()=>CompanyWorkPattern, cretedby => cretedby.patterncreate,{cascade:true})
  patterncreateby:CompanyWorkPattern[];

  @OneToMany(()=>CompanyWorkPattern, updatedby => updatedby.patternupdate,{cascade:true})
  patternupdatedby:CompanyWorkPattern[];
}
