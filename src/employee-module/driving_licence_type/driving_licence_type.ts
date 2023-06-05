import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('driving_licence_type')
export class DrivingLicenceType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    driverType: string;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.drivingLicenceType, ({ cascade: true }))
    driving_licence_type: EmployeeModule[];

}