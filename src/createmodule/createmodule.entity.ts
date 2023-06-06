import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Createmodule {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulename:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    modulelogo: string;
    
    @Column({ type: 'boolean', default:true})
    status: Boolean;
}
