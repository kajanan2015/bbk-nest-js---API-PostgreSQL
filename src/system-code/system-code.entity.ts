import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class SystemCode {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar",{nullable:true})
    code:string;

    @Column("varchar",{nullable:true})
    purpose:string;

    @Column("int",{nullable:true})
    startValue:number;
    
    @Column("timestamp", { name: "createdDate", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
    
    @Column({ type: 'boolean', default:true})
    status: Boolean;
}
