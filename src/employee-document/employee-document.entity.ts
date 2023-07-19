
import { Employee, EmployeeInfo } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('employee_document')
export class EmployeeDocument {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, employee => employee.documents)
    @JoinColumn({ name: 'employee_id' })
    empid: EmployeeInfo;

    @Column("varchar", { name: 'document_path', nullable: true })
    docPath: String;

    @Column("varchar", { name:'document_type', nullable: true })
    docType: String;

    @Column("varchar", { name:'description', nullable: true })
    description: String;

    @Column({ name:'status', type: 'boolean', default: true })
    status: Boolean;

    @Column({ type: 'boolean', default: true })
    active: Boolean;

    @ManyToOne(() => User, user => user.empDocEditedUser)
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @Column("timestamp", { name: "created_at", default: () => null })
    created_at: Date;

}
