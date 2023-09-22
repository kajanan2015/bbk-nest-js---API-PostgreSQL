import { Injectable } from '@nestjs/common';
import { CreateTimesheetEmployeeDto } from './create-timesheet-employee.dto';
import { UpdateTimesheetEmployeeDto } from './update-timesheet-employee.dto';
import { Employee } from 'src/employee-module/employee-module.entity';
import { SelectQueryBuilder, getConnection } from 'typeorm';
import { AssignWorkPatternSatatus } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignWorkPatternInfoSatatus } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
const { parse, format, addYears, endOfDay, getDayOfYear, addMonths, parseISO } = require('date-fns');


@Injectable()
export class TimesheetEmployeeService {
  create(createTimesheetEmployeeDto: CreateTimesheetEmployeeDto) {
    return 'This action adds a new timesheetEmployee';
  }

  findAll() {
    return `This action returns all timesheetEmployee`;
  }

 async finddata(companyid,start_date,end_date) {
      const employee= await this.findemployee(companyid,start_date,end_date)
    // return employee;
    let employee_data=[]
    let loopdata  
    for(const i of employee){
        loopdata={
          employeeId:i.id,
          employeeCode:i.employeeCode,
          nickName:i.linkedEmployee[0]?.nickName,
        }
        employee_data.push(loopdata)  
    }
    return employee_data
  }


async findemployee(companyid,start_date,end_date){
  // return start_date;
    const date = new Date(start_date);
    const enddateconverted=new Date(end_date);
    const startdateformatted=format(date,'dd-MM-yyyy')
    const endeddateformatted=format(enddateconverted,'dd-MM-yyyy')

    const query = getConnection()
    .getRepository(Employee)
    .createQueryBuilder('employee')
    .leftJoinAndSelect('employee.company', 'company')
    .leftJoinAndSelect('employee.linkedEmployee', 'linkedEmployee')
    .leftJoinAndSelect('employee.assignworkpattern', 'assignworkpattern2')
    .leftJoinAndSelect('assignworkpattern2.assignworkpatterninfo', 'assignworkpatterninfo')
    
    .innerJoin('employee.assignworkpattern', 'assignworkpattern') // Assuming there is a workpattern relation
    .andWhere('linkedEmployee.startDate <= :date', { date })
    .andWhere('assignworkpattern2.status = :status', { status: AssignWorkPatternSatatus.ACTIVE })
    .andWhere('assignworkpatterninfo.status = :status', { status: AssignWorkPatternInfoSatatus.ACTIVE })
    .andWhere('linkedEmployee.status = :status', { status: 1 })
    // .andWhere('linkedEmployee.active = :active', { active: 1 })
    .andWhere('company.id = :companyid', { companyid })
    .andWhere('(linkedEmployee.endDate IS NULL OR linkedEmployee.endDate > :date)', { date })
    // .andWhere('assignworkpatterninfo.assign_at BETWEEN :start AND :end', {
    //   start: startdateformatted,
    //   end: endeddateformatted,
    // });

  const data= await query.getMany();
    
    return data;
  }

  update(id: number, updateTimesheetEmployeeDto: UpdateTimesheetEmployeeDto) {
    return `This action updates a #${id} timesheetEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetEmployee`;
  }
}
