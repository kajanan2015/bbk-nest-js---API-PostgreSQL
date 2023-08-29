import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CompanyWorkPattern } from '../company-work-pattern.entity';
import { Employee } from 'src/employee-module/employee-module.entity';

export enum AssignWorkPatternSatatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

@Entity('employee_assign_work_pattern')
export class EmployeeAssignWorkPattern {
  @PrimaryGeneratedColumn()
  assign_id: number;

  @Column("timestamp", { name: "assign_at", default: () => "CURRENT_TIMESTAMP" })
  assign_at: Date;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updated_at: Date;

  @Column("enum", { name: "status", enum: AssignWorkPatternSatatus, default: AssignWorkPatternSatatus.ACTIVE, comment: "active/inactive" })
  status: AssignWorkPatternSatatus;

  @ManyToOne(() => User, user => user.assignworkpatterncreatedby)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User, user => user.assignworkpatternupdatedby)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @ManyToOne(() => Employee, employee => employee.assignworkpattern)
  @JoinColumn({ name: 'assign_employee_id' })
  employeeId: Employee;

  @ManyToOne(() => CompanyWorkPattern, pattern => pattern.assignworkpattern)
  @JoinColumn({ name: 'assign_work_pattern_id' })
  workpatternId: CompanyWorkPattern;

  @OneToMany(() => EmployeeAssignWorkPatternInfo, assignpattern => assignpattern.assignpatternId, { cascade: true })
  assignworkpatterninfo: EmployeeAssignWorkPatternInfo[];

  @OneToMany(() => EmployeeAssignWorkPatternHistory, assignpatternhistory => assignpatternhistory.assignpatternId, { cascade: true })
  assignworkpatternhistory: EmployeeAssignWorkPatternHistory[];


}


export enum AssignPatternInfoWorkMode {
  ON = "work day",
  OFF = "off day"
}

@Entity('employee_assign_work_pattern_info')
export class EmployeeAssignWorkPatternInfo{
  @PrimaryGeneratedColumn()
  assign_pattern_info_id:Number;

  @ManyToOne(() => User, user => user.assignworkpatterninfocreatedby)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column("int",{name:"pattern_round",nullable:true,default:null})
  pattern_round:number;

  @Column("time",{name:"start_time",nullable:true,default:()=>null})
  start_time:Date;

  @Column("time",{name:"end_time",nullable:true,default:()=>null})
  end_time:Date;
  
  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;


  @Column("date", { name: "assign_at", nullable:true, default: () => null })
  assign_at: Date;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updated_at: Date;

  @ManyToOne(() => User, user => user.assignworkpatterninfoupdatedby)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @ManyToOne(() => EmployeeAssignWorkPattern, pattern => pattern.assignworkpatterninfo)
  @JoinColumn({ name: 'assign_work_pattern_main_id' })
  assignpatternId: EmployeeAssignWorkPattern;

  @Column("enum", { name: "work_mode", enum: AssignPatternInfoWorkMode, default: AssignPatternInfoWorkMode.OFF, comment: "work day/off day" })
  workmode: AssignPatternInfoWorkMode;
}



@Entity('master_employee_assign_work_pattern_info')
export class MasterEmployeeAssignWorkPatternInfo{
  @PrimaryGeneratedColumn()
  assign_pattern_info_id:Number;

  @ManyToOne(() => User, user => user.assignworkpatterninfocreatedby)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column("int",{name:"pattern_round",nullable:true,default:null})
  pattern_round:number;

  @Column("time",{name:"start_time",nullable:true,default:()=>null})
  start_time:Date;

  @Column("time",{name:"end_time",nullable:true,default:()=>null})
  end_time:Date;
  
  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;


  @Column("date", { name: "assign_at", nullable:true, default: () => null })
  assign_at: Date;

  @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
  updated_at: Date;

  @ManyToOne(() => User, user => user.assignworkpatterninfoupdatedby)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @ManyToOne(() => EmployeeAssignWorkPattern, pattern => pattern.assignworkpatterninfo)
  @JoinColumn({ name: 'assign_work_pattern_main_id' })
  assignpatternId: EmployeeAssignWorkPattern;

  @Column("enum", { name: "work_mode", enum: AssignPatternInfoWorkMode, default: AssignPatternInfoWorkMode.OFF, comment: "work day/off day" })
  workmode: AssignPatternInfoWorkMode;
}



export enum AssignPatternHistory {
 ASSIGNHISTORY="employee assign work pattern history",
 ASSIGNINFOHISTORY="employee assigned work pattern info history",
 DEFAULT="no type"
}

@Entity('employee_assign_work_pattern_history')
export class EmployeeAssignWorkPatternHistory{
  @PrimaryGeneratedColumn()
  assign_history_id:Number;

  @Column("enum", { name: "history_data_type", enum: AssignPatternHistory, default: AssignPatternHistory.DEFAULT, comment: "employee assign work pattern historyemployee assigned work pattern info history/schedule history/no type" })
  history_data_type: AssignPatternHistory;

  @Column({ type: "text", name: "history_data" })
  history_data: String;

  @ManyToOne(() => Employee, employee => employee.assignworkpatternhistory)
  @JoinColumn({ name: 'assign_employee_id' })
  employeeId: Employee;

  @ManyToOne(() => EmployeeAssignWorkPattern, assignpattern => assignpattern.assignworkpatternhistory)
  @JoinColumn({ name: 'assign_id' })
  assignpatternId: EmployeeAssignWorkPattern;
}