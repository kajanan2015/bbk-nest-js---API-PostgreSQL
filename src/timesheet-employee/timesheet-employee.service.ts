import { Injectable } from '@nestjs/common';
import { CreateTimesheetEmployeeDto } from './create-timesheet-employee.dto';
import { UpdateTimesheetEmployeeDto } from './update-timesheet-employee.dto';
import { Employee } from 'src/employee-module/employee-module.entity';
import { SelectQueryBuilder, getConnection } from 'typeorm';
import { AssignWorkPatternSatatus } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignWorkPatternInfoSatatus } from 'src/company-work-pattern/assign_work_pattern/employee-assign-work-pattern.entity';
import { differenceInMilliseconds, differenceInMinutes } from 'date-fns';
const { parse, format, addYears, endOfDay, getDayOfYear, addMonths, parseISO, parseDate } = require('date-fns');


@Injectable()
export class TimesheetEmployeeService {
  create(createTimesheetEmployeeDto: CreateTimesheetEmployeeDto) {
    return 'This action adds a new timesheetEmployee';
  }

  findAll() {
    return `This action returns all timesheetEmployee`;
  }

  async finddata(companyid, start_date, end_date) {
    const employee = await this.findemployee(companyid, start_date, end_date)
    // return employee;
    let employee_data = [];
    let employee_assignworkpattern = [];
    let loopdata
    for (const i of employee) {
      loopdata = {
        employeeId: i.id,
        employeeCode: i.employeeCode,
        nickName: i.linkedEmployee[0]?.nickName,
      }

      for (const l of i.assignworkpattern) {
        for (const k of l.assignworkpatterninfo) {
          let formattedStartTime = "00:00";
          let formattedEndTime = "00:00";
          let formattedTimeDifference = "00:00"
          if (k.start_time != null && k.end_time != null) {
            const parsedStartTime = parse(k.start_time, 'HH:mm:ss', new Date());
            formattedStartTime = format(parsedStartTime, 'HH:mm');
            const parsedEndTime = parse(k.end_time, 'HH:mm:ss', new Date());
            formattedEndTime = format(parsedEndTime, 'HH:mm');

            const timeDifferenceMinutes = differenceInMinutes(parsedEndTime, parsedStartTime);

            const hours = Math.floor(timeDifferenceMinutes / 60);
            const minutes = timeDifferenceMinutes % 60;

            formattedTimeDifference = format(new Date(0, 0, 0, hours, minutes), 'HH:mm');

          }
          let loopdatanew = {
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            assign_at: k.assign_at,
            workmode: k.workmode,
            timedifference: formattedTimeDifference,
            timemode: "estimated"
          }
          employee_assignworkpattern.push(loopdatanew)
        }

      }
      loopdata.workpatterninfo = employee_assignworkpattern;
      employee_data.push(loopdata);
    }
    return employee_data
  }


  async findemployee(companyid, start_date, end_date) {
    // return start_date;
    const date = new Date(start_date);
    const enddateconverted = new Date(end_date);
    const startdateformatted = format(date, 'dd-MM-yyyy')
    const endeddateformatted = format(enddateconverted, 'dd-MM-yyyy')
    const startDateAsDate = parse(startdateformatted, 'dd-MM-yyyy', new Date());
    const endDateAsDate = parse(endeddateformatted, 'dd-MM-yyyy', new Date());
   
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
      .andWhere('assignworkpatterninfo.assign_at BETWEEN :start AND :end', {
        start: startDateAsDate,
        end: endDateAsDate,
      });

    const data = await query.getMany();

    return data;
  }

  update(id: number, updateTimesheetEmployeeDto: UpdateTimesheetEmployeeDto) {
    return `This action updates a #${id} timesheetEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheetEmployee`;
  }
}