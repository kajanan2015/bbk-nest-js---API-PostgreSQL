import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paymenttype {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{ nullable: true, default: () => null})
    paymentTypeName:string;
    
    @Column("varchar",{ nullable: true, default: () => null})
    paymentTypeNameLogo: string;

    @Column({ type: 'boolean', default:true})
    status: Boolean;

}
