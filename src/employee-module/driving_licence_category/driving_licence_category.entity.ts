import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeModule } from '../employee-module.entity';

@Entity('driving_licence_category')
export class DrivingLicenceCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    driverLicenceCategory: string;

    @Column({ type: 'boolean', default: true })
    status: Boolean;

    @OneToMany(() => EmployeeModule, employeemodule => employeemodule.driverLicenceCategory, ({ cascade: true }))
    employee: EmployeeModule;

}