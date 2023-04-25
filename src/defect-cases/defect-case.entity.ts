import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Entity()
export class defectCases {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar",{nullable:true})
question:string;

@Column({ type: 'boolean', default:true})
status: Boolean;

}
