import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('driving_licence_category')
export class DrivingLicenceCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    driverLicenceCategory: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @ManyToMany(() => EmployeeModule, employeemodule => employeemodule.drivingLicenceCategory)
    @JoinTable()
    empDlCategory: EmployeeModule[];

}