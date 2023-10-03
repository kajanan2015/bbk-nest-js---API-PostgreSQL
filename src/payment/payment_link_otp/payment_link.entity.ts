
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity('company_payment_link_generate_data')
export class PaymentLinkData {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{nullable:true,default:null})
    otp_number:number;

    @ManyToOne(() => User, user => user.companypaymentlinkcreate)
    @JoinColumn({ name: 'created_by' })
    created_by: User;
  
    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => CompaniesEntity, company => company.paymentdatalink)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;
}
