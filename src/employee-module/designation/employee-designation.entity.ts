import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EmployeeModule } from '../employee-module.entity';

@Entity()
export class EmpDesignation {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar",{ nullable: true , length: 250, default: () => null })
designationName:string;

@Column({ type: 'boolean', default:true})
status: boolean;

@OneToMany(()=>EmployeeModule,employeemodule=>employeemodule.designation,({cascade:true}))
designation: EmployeeModule;
}