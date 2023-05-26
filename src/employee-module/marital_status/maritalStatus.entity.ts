import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeModule } from "../employee-module.entity";

@Entity('marital_status')
export class MaritalStatus {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    name: string;

    @Column({ type: 'boolean', default:true})
    status: boolean;

    @OneToMany(()=>EmployeeModule,employeemodule=>employeemodule.maritalStatus, ({cascade:true}))
    employee: EmployeeModule;  
}
