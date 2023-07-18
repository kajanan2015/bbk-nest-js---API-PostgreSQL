import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';

@Entity('driving_licence_type')
export class DrivingLicenceType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    driverLicenceType: string;

    @OneToMany(() => EmployeeInfo, employee => employee.drivingLicenceType, ({ cascade: true }))
    employee: EmployeeInfo;

}