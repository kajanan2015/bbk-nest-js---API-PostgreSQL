import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CompaniesEntityinfo } from '../companies.entity';
import { EmployeeInfo } from 'src/employee-module/employee-module.entity';
import { companyvehicledata } from 'src/company-vehicle/companyvehicle.entity';

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

    @Column("varchar", { nullable: true, length: 500, default: () => null })
    country_code: string;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    time_zone: string;

    @Column("varchar", { name: "currency_unit", nullable: true, length: 250, default: () => null })
    currencyUnit: string;

    @OneToMany(() => CompaniesEntityinfo, companycountry => companycountry.country, { cascade: true })
    companyCountry: CompaniesEntityinfo[];

    @OneToMany(() => CompaniesEntityinfo, companyregcountry => companyregcountry.regAddressCountry, { cascade: true })
    companyRegAddressCountry: CompaniesEntityinfo[];

    @OneToMany(() => EmployeeInfo, employeemodule => employeemodule.addressCountry, { cascade: true })
    employeeCountry: EmployeeInfo[];

    @OneToMany(() => EmployeeInfo, employeemodule => employeemodule.refCompAddressCountry, { cascade: true })
    refCompAddressCountry: EmployeeInfo[];

    @OneToMany(() => companyvehicledata, vehicledetails => vehicledetails.addressCountry, { cascade: true })
    vehicledetails: companyvehicledata[]

}
