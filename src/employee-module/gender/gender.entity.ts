import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeModule } from "../employee-module.entity";

@Entity('gender')
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    name: string;

    @Column({ type: 'boolean', default:true})
    status: boolean;

    @OneToMany(()=>EmployeeModule,employeemodule=>employeemodule.gender, ({cascade:true}))
    employee: EmployeeModule;
}
