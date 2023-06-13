import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
@Entity()
export class CompanyPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 250 })
    paymentLink: string;

    @Column("varchar", { length: 250 })
    sendedContact: string;

    @Column({ type: 'boolean', default: true })
    linkstatus: Boolean;

    @Column("varchar", { length: 250 })
    invoiceNumber: string;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    issuedDate: Date;

    @ManyToOne(() => User, userissue => userissue.issueByuser)
    @JoinColumn({ name: 'issuedBy' })
    issuedBy: User;

}