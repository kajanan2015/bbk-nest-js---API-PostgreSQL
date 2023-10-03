import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CustomerSupportDetails } from '../customer-support.entity'

@Entity('inquiry_type')
export class InquiryType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name: "inquiry_type", length: 300, default: () => null })
    inquiryType: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @OneToMany(() => CustomerSupportDetails, customerSup => customerSup.inquiryType, { cascade: true })
    customerSupport: CustomerSupportDetails[];
}
