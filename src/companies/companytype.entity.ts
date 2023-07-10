import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from './companies.entity';

@Entity()
export class companytype {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar",{ nullable: true , length: 250, default: () => null })
companyTypeName:string;

@Column({ type: 'boolean', default:true})
status: boolean;

@OneToMany(() => CompaniesEntity, companytype => companytype.companyType,{ cascade: true })
companyType: CompaniesEntity[];

}
