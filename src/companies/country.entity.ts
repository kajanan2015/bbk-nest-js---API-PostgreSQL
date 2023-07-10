import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from './companies.entity';
import { EmployeeModule } from 'src/employee-module/employee-module.entity';

@Entity('country')
export class country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    country: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    currency: string;

    @Column("varchar", { nullable: true, length: 500, default: () => null })
    country_flag_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    time_zone: string;
   
    @Column("varchar", {name:"currency_unit", nullable: true, length: 250, default: () => null })
    currencyUnit: string;

    @OneToMany(() => CompaniesEntity, companycountry => companycountry.country, { cascade: true })
    companyCountry: CompaniesEntity[];

    @OneToMany(() => CompaniesEntity, companyregcountry => companyregcountry.regAddressCountry, { cascade: true })
    companyRegAddressCountry: CompaniesEntity[];

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.addressCountry, { cascade: true })
    employeeCountry: EmployeeModule[];

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.refCompAddressCountry, { cascade: true })
    refCompAddressCountry: EmployeeModule[];

}
