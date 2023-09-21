import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { EmployeeAssignWorkPattern } from './assign_work_pattern/employee-assign-work-pattern.entity';


export enum WorkType {
    WITHTIME = "With time",
    WITHOUTTIME = "Without time"
  }
export enum WorkPatternType{
    WEEK="default 7 day pattern",
    MOREWEEK="more than 7 days",
    CUSTOM="custom pattern"
 } 

export enum WorkPatternStatus{
    ACTIVE="active",
    INACTIVE="inactive"
} 

@Entity("company-work-pattern")
export class CompanyWorkPattern {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    workPatternName: string;


    @Column("varchar", { length: 250 ,nullable: true ,default: () => null})
    workPatternCode: string;


    @Column("enum", { enum: WorkType, default: WorkType.WITHOUTTIME, comment: "With time/Without time" })
    workType: WorkType;
   
    @Column("enum", { enum: WorkPatternType, default: WorkPatternType.WEEK, comment: "default 7 day pattern/more than 7 days/custom pattern" })
    patternType: WorkPatternType;

    @Column("int", { nullable: true, default: () => null })
    noOfDays: number;

    @Column("int", { nullable: true, default: () => null })
    noOfWeeks: number;

    @Column("int", { nullable: true, default: () => null })
    noOfWorkDays: number;

    @Column("int", { nullable: true, default: () => null })
    noOfOffDays: number;

    @ManyToOne(() => CompaniesEntity, company => company.workpattern)
    @JoinColumn({ name: 'companyId' })
    company: CompaniesEntity;

  
    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @ManyToOne(() => User, usercretae => usercretae.patterncreateby)
    @JoinColumn({ name: 'createdBy' })
    patterncreate: User;

    @ManyToOne(() => User, userupdate => userupdate.patternupdatedby)
    @JoinColumn({ name: 'updatedBy' })
    patternupdate: User;

    @OneToMany(() => EmployeeAssignWorkPattern, assignpattern => assignpattern.workpatternId, { cascade: true })
    assignworkpattern: EmployeeAssignWorkPattern[];

    @Column("enum", { enum: WorkPatternStatus, default: WorkPatternStatus.ACTIVE, comment: "active/inactive" })
    status: WorkPatternStatus;

    // @OneToMany(() => EmployeeDataHistory, patternDataHistory => patternDataHistory.workpattern,{ cascade: true })
    // editHistory: EmployeeDataHistory[];
}
