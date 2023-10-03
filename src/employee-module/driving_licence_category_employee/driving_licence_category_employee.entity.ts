import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeInfo } from "../employee-module.entity";
import { DrivingLicenceCategory } from "../driving_licence_category/driving_licence_category.entity";

@Entity('driving_licence_category_employee')
export class DrivingLicenceCategoryEmployee {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EmployeeInfo, employeeInfo => employeeInfo.drivingLicenceCategory)
    @JoinColumn({ name: 'employee_info_id' })
    empid: EmployeeInfo;

    @ManyToOne(() => DrivingLicenceCategory, category => category.drivingLicenceCategoryEmployee)
    @JoinColumn({ name: 'driving_license_category_id' })
    category: DrivingLicenceCategory;

    @Column({ name: 'licence_category_issue_date', nullable: true, default: () => null })
    issueDate: Date | null;

    @Column({ name: 'licence_category_expire_date', nullable: true, default: () => null })
    expireDate: Date | null;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

}