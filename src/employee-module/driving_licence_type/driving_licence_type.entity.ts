import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('driving_licence_type')
export class DrivingLicenceType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    driverLicenceType: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.driverLicenceType, ({ cascade: true }))
    employee: EmployeeModule;

}