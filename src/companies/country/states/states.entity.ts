import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { country } from '../country.entity';
import { CompaniesEntityinfo } from 'src/companies/companies.entity';
import { City } from '../cities/city.entity';

@Entity('country_states')
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    name: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    country_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    fips_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    iso2: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    type: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    latitude: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    longitude: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    flag: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    wikiDataId: string;

    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(() => CompaniesEntityinfo, company => company.state, { cascade: true })
    companyAddress: CompaniesEntityinfo[];

    @OneToMany(() => CompaniesEntityinfo, company => company.regAddressState, { cascade: true })
    companyRegAddress: CompaniesEntityinfo[];
}