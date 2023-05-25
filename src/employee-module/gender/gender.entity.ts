import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeModule } from "../employee-module.entity";

@Entity('gender')
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    name: string;

    @Column({ type: 'boolean', default:true})
    status: boolean;

    @OneToOne(()=>EmployeeModule,employeemodule=>employeemodule.gender)
    employee: EmployeeModule;  
}
