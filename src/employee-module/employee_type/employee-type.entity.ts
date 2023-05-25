import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EmployeeModule } from '../employee-module.entity';

@Entity('EmployeeType')
export class EmployeeType {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar",{ nullable: true , length: 250, default: () => null })
employeeTypeName:string;

@OneToMany(()=>EmployeeModule,employeemodule=>employeemodule.employeeType,({cascade:true}))
employeType:EmployeeModule[];

} 
