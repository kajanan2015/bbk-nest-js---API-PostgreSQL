
import { EmployeeModule } from "src/employee-module/employee-module.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmployeeDocument {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => EmployeeModule, employee => employee.documents )
    @JoinColumn({ name: 'empid' })
    empid: EmployeeModule;

    @Column("varchar",{nullable:true})
    docPath:String;

    @Column("varchar",{nullable:true})
    docType:String;

    @Column("varchar",{nullable:true})
    description:String;

    @Column({ type: 'boolean', default:true})
    status: Boolean;

    @Column({ type: 'boolean', default:true})
    active: Boolean;

    @ManyToOne(() => User, user => user.empDocEditedUser)
    @JoinColumn({ name: 'addedBy' })
    addedBy: User;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

}
