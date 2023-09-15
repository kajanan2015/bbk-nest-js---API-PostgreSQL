import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository, SelectQueryBuilder, getConnection } from 'typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { WorkType } from './company-work-pattern.entity';
import { WorkPatternType } from './company-work-pattern.entity';
import { EmployeeAssignWorkPattern, EmployeeAssignWorkPatternHistory } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignWorkPatternSatatus } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignPatternInfoWorkMode } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { EmployeeAssignWorkPatternInfo } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { WorkPatternStatus } from './company-work-pattern.entity';
import { MasterEmployeeAssignWorkPatternInfo } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { Transactionservicedb } from 'src/Transaction-query/transaction.service';
import {addDays, differenceInDays } from 'date-fns';
import { User } from 'src/user/user.entity';
const { parse, format, addYears, endOfDay, getDayOfYear, addMonths, parseISO } = require('date-fns');


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
    @InjectRepository(EmployeeAssignWorkPatternHistory)
    private readonly employeeWorkPatternHistoryRepo: Repository<EmployeeAssignWorkPatternHistory>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async findAll(companyid) {
    const workpatterndata = await this.patternrepository.find({where:{company:companyid}, relations: ['company', 'patterncreate'] })
    return workpatterndata;
  }

  async findAllActiveCompanyWise(companyid) {
    const workpatterndata = await this.patternrepository.find({ where: { company:companyid,status: WorkPatternStatus.ACTIVE }, relations: ['company', 'patterncreate'] })
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

  // ** Fine employee current work pattern
  async findCurrentWorkPattern(empId) {
    // ** current date
    const date = new Date();
    // const workpattern = await this.employeeassignrepo.find({ where: { employeeId: empId, assign_at: LessThanOrEqual(date), status: WorkPatternStatus.ACTIVE }, order:{ assign_at: 'DESC' } });

    // ** get current work pattern
    const query: SelectQueryBuilder<EmployeeAssignWorkPattern> = getConnection()
      .getRepository(EmployeeAssignWorkPattern)
      .createQueryBuilder("workpattern")
      .leftJoinAndSelect("workpattern.workpatternId", "workpatternId")
      .andWhere("workpattern.employeeId = :empId", { empId })
      .andWhere("workpattern.assign_at <= :date", { date })
      .andWhere("workpattern.status = :status", { status: WorkPatternStatus.ACTIVE })
      .orderBy("workpattern.assign_at", 'DESC')

    // ** Current work pattern
    const workPattern = await query.getOne();

    // ** Get current work pattern info
    const workpatternInfo = await this.employeeassigninforepo.findOne({
      where: {
        assignpatternId: workPattern?.['assign_id'], assign_at: format(
          date,
          'yyyy-MM-dd'
        )
      }
    });
    // ** Current pattern rounds
    const patternRounds = await this.employeeassigninforepo.find({ where: { assignpatternId: workPattern?.['assign_id'], pattern_round: workpatternInfo?.['pattern_round'] } });

    return {
      patternInfo: patternRounds,
      workPattern: workPattern?.['workpatternId'],
      startedDate: workPattern?.['assign_at']
    };

  }

  // ** Fine employee future work pattern
  async findFutureWorkPatterns(empId) {
    // ** current date
    const date = new Date();
    // const workpattern = await this.employeeassignrepo.find({ where: { employeeId: empId, assign_at: LessThanOrEqual(date), status: WorkPatternStatus.ACTIVE }, order:{ assign_at: 'DESC' } });

    // ** get future work pattern
    const query: SelectQueryBuilder<EmployeeAssignWorkPattern> = getConnection()
      .getRepository(EmployeeAssignWorkPattern)
      .createQueryBuilder("workpattern")
      .leftJoinAndSelect("workpattern.workpatternId", "workpatternId")
      .andWhere("workpattern.employeeId = :empId", { empId })
      .andWhere("workpattern.assign_at > :date", { date })
      .andWhere("workpattern.status = :status", { status: WorkPatternStatus.ACTIVE })
      .orderBy("workpattern.assign_at", 'ASC')

    // ** future work patterns
    const workPatterns = await query.getMany();

    let results = [];

    for (let i = 0; i < workPatterns?.length; i++) {    
      // **  pattern rounds
      const patternRounds = await this.employeeassigninforepo.find({ where: { assignpatternId: workPatterns?.[i]?.['assign_id'], pattern_round: 0 } });
      
      results.push({
        patternInfo: patternRounds,
        workPattern: workPatterns?.[i]?.['workpatternId'],
        startedDate: workPatterns?.[i]?.['assign_at']
      })
    }


    return results

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
    
    
    
    // pattern strat date
    const dateString = data.patternstartdate;
    const parts = dateString.split('-'); // Split the date string into parts
    
    // to find exist assign-info
    const convertdatestring=parse(dateString, 'dd-MM-yyyy', new Date());
    const findexistdata=await this.employeeassignrepo.find({where: {employeeId:data.employeeId,assign_at:LessThanOrEqual(convertdatestring)}})


    // Create a new Date object with the parts (Note: Months in JavaScript are 0-based)
    const startmaindate = new Date(parts[2], parts[1] - 1, parts[0]);
    const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
    const nextextendeddate = addMonths(parsedDate, 3);


    newdata = {
      created_at: data.userTime,
      assign_at: parse(dateString, 'dd-MM-yyyy', new Date()),
      next_extended_date: nextextendeddate,
      status: AssignWorkPatternSatatus.ACTIVE,
      created_by: data.created_by,
      employeeId: data.employeeId,
      workpatternId: patterndata.id,
    }
    const insertassignemployee = await this.employeeassignrepo.create(newdata)
    const saveassignemployee = await this.employeeassignrepo.save(insertassignemployee)

    const createdBy = await this.userRepo.findOne({id: data.created_by});

    const historyData = {
      history_data_type: 'employee assign work pattern history',
      employeeId: data.employeeId,
      history_data: JSON.stringify({
        pattern: data.formattedData,
        patternDetails: patterndata,
        assign_at: parse(dateString, 'dd-MM-yyyy', new Date()),
        created_by: createdBy?.['firstName'],
        created_at: data.userTime,
      }),
      start_date: parse(dateString, 'dd-MM-yyyy', new Date()),
      assignpatternId: saveassignemployee['assign_id'],
    }

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
      let value = 0;
      for (const i of data.formattedData) {
        const date = new Date(startmaindate);
        date.setDate(startmaindate.getDate() + r * patternDays + value);
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

    const response11 = await this.transactionService.transactionforinsertworkpattern(EmployeeAssignWorkPatternInfo, MasterEmployeeAssignWorkPatternInfo, EmployeeAssignWorkPatternHistory,EmployeeAssignWorkPattern, dataofassigninfo, rangedArray, historyData,findexistdata,convertdatestring)
    if (response11 == 200) {
      return 200;
    } else {
      return 500
    }
    // return 200
    // let inserttintomaster = await this.masteremployeeassigninforepo.create(dataofassigninfo[0])
    // await this.masteremployeeassigninforepo.save(inserttintomaster)
    // let insertassignemployeeinfo = await this.employeeassigninforepo.create(dataofassigninfo)
    // await this.employeeassigninforepo.save(insertassignemployeeinfo)

  }

  async extendassignworkpatterntoemployee() {
    const date = new Date();
    const parsedDate = format(date, 'dd-MM-yyyy');;
    console.log(parsedDate, 34)
    const findexistdata = await this.employeeassignrepo.find({ where: { next_extended_date: LessThanOrEqual(date), ended_at: null }, relations: ['employeeId', 'workpatternId'] })
    let patterndata;
    let lastvalue;
    let patternid;
    let resultslength;
    for (const i of findexistdata) {
      resultslength = 0
      patterndata = await this.masteremployeeassigninforepo.find({ where: { assignpatternId: i.assign_id },relations:['assignpatternId'] })

      patternid = i.assign_id
      const subQuery = await this.employeeassigninforepo.createQueryBuilder('sub')
        .select('MAX(sub.pattern_round)', 'maxPatternRound')
        .where('sub.assignpatternId = :assignId', { assignId: patternid })
        .getQuery();

      const results = await this.employeeassigninforepo.createQueryBuilder('entity')
        .where(`entity.assignpatternId = :assignId AND entity.pattern_round = (${subQuery})`, { assignId: patternid })
        .getMany();


        // console.log(results,78787878)
      let lastValue = results[results.length - 1];
      let startmaindate = new Date(lastValue.assign_at)
      const nextextendeddate = addMonths(startmaindate, 3);
      const formattedmaindate = format(startmaindate, 'dd-MM-yyyy');
      const formattedendeddate = format(nextextendeddate, 'dd-MM-yyyy');
      resultslength = patterndata.length - results.length;
      // end date after 3 month
      const new_main_date_after_put_exist_pattern=addDays(startmaindate,(resultslength+2))
      
      const lastDateAfterThreeMonths = endOfDay(addMonths(startmaindate, 3));
      const nextupdatedate=addMonths(date,3)
      // number of day in after 3 month
      const numberOfDaysAfterthreemonths = differenceInDays(lastDateAfterThreeMonths, startmaindate)

      let assigninfo;
      let dataofassigninfo = [];
      let dataassign = [];
      let dateObject;
      if (patterndata.length != results.length) {
       
        // console.log(startmaindate,898)
       let x=1;
        for (let i = results.length; i <= patterndata.length; i++) {
        
           const newmaindate = new Date(startmaindate);
      newmaindate.setDate(startmaindate.getDate() + x);
          // one pattern data 
          assigninfo = {
            created_by: 1,
            start_time: patterndata[i - 1].start_time,
            end_time: patterndata[i - 1].end_time,
            created_at: date,
            assign_at: newmaindate,
            assignpatternId: patterndata[i - 1].assignpatternId.assign_id,
            workmode: patterndata[i - 1].workmode,
            pattern_round: lastValue.pattern_round
          }
          dataofassigninfo.push(assigninfo);
          x++;
        }

     

      }
      const patternDays =patterndata.length;
      const repetitions = Math.floor((numberOfDaysAfterthreemonths-resultslength) / patternDays);
      const remainingDays = (numberOfDaysAfterthreemonths-resultslength) % patternDays;
 
      for (let r = 0; r < repetitions; r++) {
        let value = 0;
        for (const i of patterndata) {
          const enddate = new Date(new_main_date_after_put_exist_pattern);
          enddate.setDate(new_main_date_after_put_exist_pattern.getDate() + r * patternDays + value);
          // recordsToInsert.push({ date, dayNumber: day + 1 });
   
          let parsedstartTime;
          let parsedendTime;
  
          assigninfo = {
            created_by: 1,
            start_time: i.start_time,
            end_time: i.end_time,
            created_at: date,
            assign_at: enddate,
            assignpatternId:  i.assignpatternId.assign_id,
            workmode: i.workmode,
            pattern_round: r+lastValue.pattern_round
          }
  
          dataofassigninfo.push(assigninfo);

          value++
        }
  
      }
  
      // Generate records for the remaining days
      for (let r = 0; r < remainingDays; r++) {
        const date_object = new Date(new_main_date_after_put_exist_pattern);
        date_object.setDate(new_main_date_after_put_exist_pattern.getDate() + repetitions * patternDays + r);
        const dayNumber = r % patternDays + 1;
        let parsedstartTime;
        let parsedendTime;
        assigninfo = {
          created_by:1,
          start_time: patterndata[r].start_time,
          end_time: patterndata[r].end_time,
          created_at: date,
          assign_at: date_object,
          assignpatternId:  patterndata[r].assignpatternId.assign_id,
          workmode:  patterndata[r].workmode,
          pattern_round:lastValue.pattern_round+repetitions + 1
        }
  
        dataofassigninfo.push(assigninfo);
      }

      // EmployeeDataHistoryModule.id
      // workpatternId.id
 
const rangedArray={next_extended_date:nextupdatedate,updated_at:date,updated_by:1}

      const response11 = await this.transactionService.transactionforinsertworkpatternextend(EmployeeAssignWorkPatternInfo, EmployeeAssignWorkPattern, dataofassigninfo, rangedArray,i)
      if (response11 == 200) {
        return 200;
      } else {
        return 500
      }
    }

  
  }

  async getWorkPatternHistoryData(employeeId) {
    return this.employeeWorkPatternHistoryRepo.find({employeeId: employeeId});
  }
}
