import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class CompanyPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 500 ,nullable: true ,default: () => null})
    paymentLink: string;

    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    sendedContact: string;

    @Column({ type: 'boolean', default:true})
    linkstatus: Boolean;

    @Column("text",{nullable:true,default:null})
    paymentdata:string;

    @Column("varchar", { length: 250 , nullable: true ,default: () => null})
    invoiceNumber: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    totalvalue: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 ,nullable:true,default:null})
    discount: number;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    issuedDate: Date;

    @ManyToOne(() => User, userissue => userissue.issueByuser)
    @JoinColumn({ name: 'issuedBy' })
    issuedBy: User;

    @ManyToOne(() => CompaniesEntity, company => company.paymentdata)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

}