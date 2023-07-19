import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';

@Entity('driving_licence_category')
export class DrivingLicenceCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name:'category_name', nullable: true, length: 250, default: () => null })
    driverLicenceCategory: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @ManyToMany(() => EmployeeInfo, employeemodule => employeemodule.drivingLicenceCategory)
    // @JoinTable()
    empDlCategory: EmployeeInfo[];

}