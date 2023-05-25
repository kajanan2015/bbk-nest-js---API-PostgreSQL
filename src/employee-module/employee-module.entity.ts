import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { EmployeeType } from './employee-type.entity';
import { EmpDesignation } from './employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class EmployeeModule {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;
   
    @Column("varchar",{nullable:true, default: () => null})
    employeeId: string;

    @ManyToOne(() => EmployeeType,employeetype => employeetype.employeType)
    @JoinColumn({name:'employeeType'})
    employeeType:EmployeeType;

    @ManyToOne(() => EmpDesignation, designation => designation.designation)
    @JoinColumn({name:'employeeDesignation'})
    designation:EmpDesignation;

    @ManyToOne(() => CompaniesEntity, company => company.employedetails)
    @JoinColumn({ name: 'companyId' })
    company:CompaniesEntity;
}
