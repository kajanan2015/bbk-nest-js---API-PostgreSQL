import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { Repository, SelectQueryBuilder, getConnection } from 'typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { WorkType } from './company-work-pattern.entity';
import { WorkPatternType } from './company-work-pattern.entity';
import { EmployeeAssignWorkPattern } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignWorkPatternSatatus } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignPatternInfoWorkMode } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { EmployeeAssignWorkPatternInfo } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { WorkPatternStatus } from './company-work-pattern.entity';
import { MasterEmployeeAssignWorkPatternInfo } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { Transactionservicedb } from 'src/Transaction-query/transaction.service';
import { differenceInDays } from 'date-fns';
const { parse, format, addYears, endOfDay, getDayOfYear } = require('date-fns');


@Injectable()
export class CompanyWorkPatternService {
  constructor(
    @InjectRepository(CompanyWorkPattern)
    private readonly patternrepository: Repository<CompanyWorkPattern>,
    private readonly systemcodeService: SystemCodeService,
    @InjectRepository(EmployeeAssignWorkPattern)
    private readonly employeeassignrepo: Repository<EmployeeAssignWorkPattern>,
    @InjectRepository(EmployeeAssignWorkPatternInfo)
    private readonly employeeassigninforepo: Repository<EmployeeAssignWorkPatternInfo>,
    @InjectRepository(MasterEmployeeAssignWorkPatternInfo)
    private readonly masteremployeeassigninforepo: Repository<MasterEmployeeAssignWorkPatternInfo>,
    private readonly transactionService: Transactionservicedb,
  ) { }
  async create(createCompanyWorkPatternDto) {
    await this.findbypattername(createCompanyWorkPatternDto.workPatternName, createCompanyWorkPatternDto.company)
    const responsesystemcode = await this.systemcodeService.findOne("workpattern");
    const systemcode = responsesystemcode.code + "" + responsesystemcode.startValue;
    const newstartvalue = {
      startValue: responsesystemcode.startValue + 1,
    };
    createCompanyWorkPatternDto.workPatternCode = systemcode;
    createCompanyWorkPatternDto.workType = WorkType.WITHOUTTIME;
    const response = await this.patternrepository.create(createCompanyWorkPatternDto)
    const withputtimepattern = await this.patternrepository.save(response);


    //const responsehistorywithputtime = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(response), company:createCompanyWorkPatternDto.company,createdBy:createCompanyWorkPatternDto.patterncreate,workpattern:withputtimepattern});

    //const reswithputtime = await this.employedatahistory.save(responsehistorywithputtime);
    createCompanyWorkPatternDto.workType = WorkType.WITHTIME;
    const response2 = await this.patternrepository.create(createCompanyWorkPatternDto)
    const withtimepattern = await this.patternrepository.save(response2)
    await this.systemcodeService.update(responsesystemcode.id, newstartvalue);
    //const responsehistorywithouttime = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(response2), company:createCompanyWorkPatternDto.company,createdBy:createCompanyWorkPatternDto.patterncreate, workpattern: withtimepattern});
    // const reswithouttime = await this.employedatahistory.save(responsehistorywithouttime);
    if (withputtimepattern && withtimepattern) {
      return 200
    } else {
      return 500
    }
  }

  async findAll() {
    const workpatterndata = await this.patternrepository.find({ relations: ['company', 'patterncreate'] })
    return workpatterndata;
  }



  async findAllActive() {
    const workpatterndata = await this.patternrepository.find({ where: { status: WorkPatternStatus.ACTIVE }, relations: ['company', 'patterncreate'] })
    return workpatterndata;
  }

  async findbypattername(name: string, companyId) {
    const pattern = await this.patternrepository.find({ where: { workPatternName: name, company: companyId } });
    if (pattern.length > 0) {
      return 300
    }
  }

  async findOneBypatternCode(data) {
    const workpattrnCode = await this.patternrepository.findOne({ where: { workPatternCode: data.workPatternCode, workType: data.workType } })
    return workpattrnCode;
  }

  async findOneBycode(code) {
    console.log(code, 999)
    const workpattern = await this.patternrepository.find({ where: { workPatternCode: code, status: WorkPatternStatus.ACTIVE } });

    if (!workpattern) {
      throw new NotFoundException(` ID '${code}' not found`);
    }
    return workpattern;
  }

  async findCurrentWorkPattern(empId) {
    const date = new Date();
    const workpattern = await this.employeeassignrepo.find({ where: { employeeId: empId, status: WorkPatternStatus.ACTIVE } });
    // const workPatternInfo = await this.employeeassigninforepo.find({ where: { workpatternId: workpattern['id'] }});
    const query: SelectQueryBuilder<EmployeeAssignWorkPattern> = getConnection()
    .getRepository(EmployeeAssignWorkPattern)
    .createQueryBuilder("workpattern")
    .andWhere("workpattern.employeeId = :empId", { empId })
    .andWhere("workpattern.assign_at <= :date", { date })
    .andWhere("workpattern.status = :status", { status: WorkPatternStatus.ACTIVE })
    .orderBy("workpattern.assign_at", 'DESC')

    const data = await query.getMany();
    return data[0];
    
  }

  async findOne(id: number) {
    const workpattern = await this.patternrepository.findOne(id);
    let patternType;
    if (workpattern.patternType == WorkPatternType.WEEK) {
      patternType = 1;
    } else if (workpattern.patternType == WorkPatternType.MOREWEEK) {
      patternType = 2;
    } else if (workpattern.patternType == WorkPatternType.CUSTOM) {
      patternType = 3;
    } else {

    }
    let workType;
    if (workpattern.workType == WorkType.WITHOUTTIME) {
      workType = 0;
    } else if (workpattern.workType == WorkType.WITHTIME) {
      workType = 1;
    } else {
    }
    delete workpattern.patternType;
    workpattern.patternType = patternType;
    delete workpattern.workType;
    workpattern.workType = workType;

    if (!workpattern) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return workpattern;
  }

  async update(id: number, updateCompanyWorkPatternDto) {
    const data = await this.patternrepository.findOne(id)

    const response = await this.patternrepository.find({ where: { workPatternCode: data.workPatternCode } })


    for (const data of response) {

      await this.patternrepository.update(data['id'], updateCompanyWorkPatternDto);
      // Find the previous record of the employee
      // const previousRecord = await this.employedatahistory.findOne({
      //   where: {
      //     workpattern:data['id'],
      //     company: data['company'].id,
      //     type: "work-pattern-history"
      //   },
      //   order: { createdBy: 'DESC' },
      // });

      // If a previous record exists, update its endDate
      // if (previousRecord) {
      //   previousRecord.endDate = new Date(Date.now());
      //   previousRecord.editedBy=updateCompanyWorkPatternDto.patternupdate;
      //   await this.employedatahistory.save(previousRecord);
      // }
      // const updateresponse = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(updateCompanyWorkPatternDto), company:data['company'].id,createdBy:updateCompanyWorkPatternDto.patternupdate, workpattern: data['id']});
      // const res = await this.employedatahistory.save(updateresponse);


    }
    return 200
  }

  remove(id: number) {
    return `This action removes a #${id} companyWorkPattern`;
  }

  async assignworkpatterntoemployee(data) {
    console.log(data, 12345)
    let newdata;
    let assigninfo;
    let workmode;
    let dateObject;
    // find pattern data
    const patterndata = await this.patternrepository.findOne({ where: { workPatternCode: data.workPatternName, workType: data.workType } })
  
    newdata = {
      assign_at: data.userTime,
      status: AssignWorkPatternSatatus.ACTIVE,
      created_by: data.created_by,
      employeeId: data.employeeId,
      workpatternId: patterndata.id,
    }
    const insertassignemployee = await this.employeeassignrepo.create(newdata)
    const saveassignemployee = await this.employeeassignrepo.save(insertassignemployee)




    // pattern strat date
    const dateString = data.patternstartdate;
    const parts = dateString.split('-'); // Split the date string into parts
        // Create a new Date object with the parts (Note: Months in JavaScript are 0-based)
        const startmaindate = new Date(parts[2], parts[1] - 1, parts[0]);
    // end date after 2 years
    const lastDateAfterTwoYears = endOfDay(addYears(startmaindate, 2));
   
    // number of day in two years period
    const numberOfDaysAfterTwoYears = differenceInDays(lastDateAfterTwoYears, startmaindate)
    // one pattern data
    let dataofassigninfo = [];
    let dataassign = [];
    // make pattern
    // for (const i of data.formattedData) {
    //   let parsedstartTime;
    //   let parsedendTime;
    //   console.log(i.allignment, 88888)
    //   if (i.allignment == 0) {
    //     workmode = AssignPatternInfoWorkMode.OFF
    //   } else {
    //     workmode = AssignPatternInfoWorkMode.ON
    //   }
    //   let dateObject = parse(i.date, 'dd-MM-yyyy', new Date());
    //   console.log(i.startTime, 1)
    //   if (i.startTime != undefined || i.endTime != undefined) {
    //     parsedstartTime = parse(i.startTime, 'h:mm a', new Date());
    //     parsedendTime = parse(i.endTime, 'h:mm a', new Date());

    //   }
    //   assigninfo = {
    //     created_by: data.created_by,
    //     start_time: parsedstartTime,
    //     end_time: parsedendTime,
    //     created_at: data.userTime,
    //     assign_at: dateObject,
    //     assignpatternId: insertassignemployee['assign_id'],
    //     workmode: workmode
    //   }

    //   dataofassigninfo.push(assigninfo);
    //   console.log(assigninfo)

    // }

    const patternDays = data.formattedData.length;
    const repetitions = Math.floor(numberOfDaysAfterTwoYears / patternDays);
    const remainingDays = numberOfDaysAfterTwoYears % patternDays;
    
    // Generate records for the pattern repetitions
    for (let r = 0; r < repetitions; r++) {
  let value=0;
      for (const i of data.formattedData) {
            const date = new Date(startmaindate);
      date.setDate(startmaindate.getDate() + r*patternDays+value);
      // recordsToInsert.push({ date, dayNumber: day + 1 });
      dateObject = parse(date, 'dd-MM-yyyy', new Date());
  
      // console.log(dateObject,898983)
        let parsedstartTime;
        let parsedendTime;
        if (i.alignment == 0) {
          workmode = AssignPatternInfoWorkMode.OFF
        } else {
          workmode = AssignPatternInfoWorkMode.ON
        }
       
        if (i.startTime != undefined || i.endTime != undefined) {
          parsedstartTime = parse(i.startTime, 'h:mm a', new Date());
          parsedendTime = parse(i.endTime, 'h:mm a', new Date());

        }
        assigninfo = {
          created_by: data.created_by,
          start_time: parsedstartTime,
          end_time: parsedendTime,
          created_at: data.userTime,
          assign_at: date,
          assignpatternId: insertassignemployee['assign_id'],
          workmode: workmode,
          pattern_round: r
        }

        dataofassigninfo.push(assigninfo);
        // console.log(assigninfo)
        value++
      }
      
    }

    // Generate records for the remaining days
    for (let r = 0; r < remainingDays; r++) {
      const date = new Date(startmaindate);
      date.setDate(startmaindate.getDate() + repetitions * patternDays + r);
      const dayNumber = r % patternDays + 1;
      let parsedstartTime;
      let parsedendTime;
      console.log(data.formattedData[r].alignment, 88888)
      if (data.formattedData[r].alignment == 0) {
        workmode = AssignPatternInfoWorkMode.OFF
      } else {
        workmode = AssignPatternInfoWorkMode.ON
      }
      if (data.formattedData[r].startTime != undefined || data.formattedData[r].endTime != undefined) {
        parsedstartTime = parse(data.formattedData[r].startTime, 'h:mm a', new Date());
        parsedendTime = parse(data.formattedData[r].endTime, 'h:mm a', new Date());

      }
      assigninfo = {
        created_by: data.created_by,
        start_time: parsedstartTime,
        end_time: parsedendTime,
        created_at: data.userTime,
        assign_at: date,
        assignpatternId: insertassignemployee['assign_id'],
        workmode: workmode,
        pattern_round: repetitions + 1
      }

      dataofassigninfo.push(assigninfo);
    }
    const rangedArray = dataofassigninfo.slice(0, patternDays);

    const response11=await this.transactionService.transactionforinsertworkpattern(EmployeeAssignWorkPatternInfo,MasterEmployeeAssignWorkPatternInfo,dataofassigninfo,rangedArray)
   if(response11==200){
    return 200;
   }else{
    return 500
   }
  // return 200
    // let inserttintomaster = await this.masteremployeeassigninforepo.create(dataofassigninfo[0])
    // await this.masteremployeeassigninforepo.save(inserttintomaster)
    // let insertassignemployeeinfo = await this.employeeassigninforepo.create(dataofassigninfo)
    // await this.employeeassigninforepo.save(insertassignemployeeinfo)
  
  }

  async extendassignworkpatterntoemployee(){
    const date=new Date();
  }
}
