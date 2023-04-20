import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Entity()
export class Employee  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: false , length: 30 })
  firstName: string;

  @Column("varchar", { nullable: true , length: 30 })
  middleName: string;

  @Column("varchar", { nullable: true , length: 30 })
  lastName: string;

  @Column("varchar", { nullable: false , length: 30 })
  employeeNumber: string;

  @Column({ nullable: true})
  dob: Date;

  @Column("varchar", { nullable: false , length: 100 })
  address: string;

  @Column("varchar", { nullable: false , length: 100 })
  email: string;

  @Column("varchar", { nullable: false , length: 100 })
  phone: string;

  @Column("varchar", { nullable: true , length: 30 })
  nationality: string;

  @Column("varchar", { nullable: true , length: 30 })
  country: string;
  
  @Column({ type: 'boolean', default:true})
  employeeStatus: Boolean;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @Column("int", { name: "parentCompanyid",nullable: true })
  parentCompanyid: number ;

  @ManyToMany(() => CompaniesEntity, (company) => company.employees)
  @JoinTable()
  companies: CompaniesEntity[];
}

