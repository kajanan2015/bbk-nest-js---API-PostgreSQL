import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Entity()
export class Bodymark {
@PrimaryGeneratedColumn()
id:number;

@Column("double",{nullable:true})
x:number;

@Column("double",{nullable:true})
y:number;

@Column("int")
side:number;

@Column("int")
tripId: number;

@Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
createdat: Date;

@Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
updatedat: Date;

@Column("varchar",{nullable:true})
patheImage:String;

@Column({ type: 'boolean', default:true})
status: Boolean;

}
