import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompaniesEntity } from 'src/companies/companies.entity';
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

    @OneToMany(() => CompaniesEntity, paymenttype => paymenttype.billing,{ cascade: true })
    paymentType: CompaniesEntity[];

}
