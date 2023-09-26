import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EmployeeInfo } from '../employee-module.entity';
import { integer } from 'aws-sdk/clients/cloudfront';

@Entity('employee_type')
export class EmployeeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    employeeTypeName: string;

    @Column("int", { name: 'company_id', nullable: true, default: () => null })
    company_id: number;


    @OneToMany(() => EmployeeInfo, employee => employee.employeeType, ({ cascade: true }))
    employeType: EmployeeInfo[];

    @Column({ type: 'boolean', default:true})
    status: boolean;
} 
