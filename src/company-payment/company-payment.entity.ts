import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
@Entity()
export class CompanyPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    paymentLink: string;

    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    sendedContact: string;

    @Column({ type: 'boolean', default:true})
    linkstatus: Boolean;

    @Column("varchar", { length: 250 , nullable: true ,default: () => null})
    invoiceNumber: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    totalvalue: number;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    issuedDate: Date;

    @ManyToOne(() => User, userissue => userissue.issueByuser)
    @JoinColumn({ name: 'issuedBy' })
    issuedBy: User;

}