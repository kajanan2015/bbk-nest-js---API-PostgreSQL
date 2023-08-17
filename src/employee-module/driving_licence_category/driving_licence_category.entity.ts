import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { EmployeeInfo } from '../employee-module.entity';
import { DrivingLicenceCategoryEmployee } from '../driving_licence_category_employee/driving_licence_category_employee.entity';

@Entity('driving_licence_category')
export class DrivingLicenceCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { name:'category_name', nullable: true, length: 250, default: () => null })
    driverLicenceCategory: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    // @ManyToMany(() => EmployeeInfo, employeemodule => employeemodule.drivingLicenceCategory)
    // // @JoinTable()
    // empDlCategory: EmployeeInfo[];

    @OneToMany(() => DrivingLicenceCategoryEmployee, cat => cat.empid, { cascade: true })
    drivingLicenceCategoryEmployee: DrivingLicenceCategoryEmployee[];

}