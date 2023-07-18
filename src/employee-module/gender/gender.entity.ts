import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeInfo } from "../employee-module.entity";

@Entity('gender')
export class Gender {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    name: string;

    @Column({ type: 'boolean', default:true})
    status: boolean;

    @OneToMany(()=>EmployeeInfo, employee=>employee.gender, ({cascade:true}))
    employee: EmployeeInfo;
}
