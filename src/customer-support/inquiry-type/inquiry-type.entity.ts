import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CustomerSupport } from '../customer-support.entity'

@Entity('inquiry_type')
export class InquiryType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 300, default: () => null })
    inquiryType: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @OneToMany(() => CustomerSupport, customerSup => customerSup.inquiryType, { cascade: true })
    customerSupport: CustomerSupport[];
}
