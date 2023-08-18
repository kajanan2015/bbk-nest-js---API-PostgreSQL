import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { Repository } from 'typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { WorkType } from './company-work-pattern.entity';
import { WorkPatternType } from './company-work-pattern.entity';
import { EmployeeAssignWorkPattern } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignWorkPatternSatatus } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { AssignPatternInfoWorkMode } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { EmployeeAssignWorkPatternInfo } from './assign_work_pattern/employee-assign-work-pattern.entity';
import { WorkPatternStatus } from './company-work-pattern.entity';
const { parse, format } = require('date-fns');


@Injectable()
export class CompanyWorkPatternService {
  constructor(
    @InjectRepository(CompanyWorkPattern)
    private readonly patternrepository: Repository<CompanyWorkPattern>,
    private readonly systemcodeService: SystemCodeService,
    @InjectRepository(EmployeeAssignWorkPattern)
    private readonly employeeassignrepo: Repository<EmployeeAssignWorkPattern>,
    @InjectRepository(EmployeeAssignWorkPatternInfo)
    private readonly employeeassigninforepo: Repository<EmployeeAssignWorkPatternInfo>
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
    const workpatterndata = await this.patternrepository.find({where:{status:WorkPatternStatus.ACTIVE}, relations: ['company', 'patterncreate'] })
    return workpatterndata;
  }

  async findbypattername(name: string, companyId) {
    const pattern = await this.patternrepository.find({ where: { workPatternName: name, company: companyId } });
    if (pattern.length > 0) {
      return 300
    }
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


    const patterndata = await this.patternrepository.findOne({ where: { workPatternCode: data.workPatternName, workType: data.workType } })
    console.log(patterndata, 89)
    newdata = {
      assign_at: data.userTime,
      status: AssignWorkPatternSatatus.ACTIVE,
      created_by: data.created_by,
      employeeId: data.employeeId,
      workpatternId: patterndata.id,
    }
    const insertassignemployee = await this.employeeassignrepo.create(newdata)
    const saveassignemployee = await this.employeeassignrepo.save(insertassignemployee)
    for (const i of data.formattedData) {
      let parsedstartTime;
      let parsedendTime;
      if (i.allignment == '0') {
        workmode = AssignPatternInfoWorkMode.OFF
      } else {
        workmode = AssignPatternInfoWorkMode.ON
      }
      let dateObject = parse(i.date, 'dd-MM-yyyy', new Date());
console.log(i.startTime,1)
 if(i.startTime!=undefined||i.endTime!=undefined){
parsedstartTime = parse(i.startTime, 'h:mm a', new Date());
parsedendTime = parse(i.endTime, 'h:mm a', new Date());

 }
      assigninfo = {
        created_by: data.created_by,
        start_time:parsedstartTime,
        end_time:parsedendTime,
        created_at: data.userTime,
        assign_at:dateObject,
        assignpatternId: insertassignemployee['assign_id'],
        workmode: workmode
      }
console.log(assigninfo)
      let insertassignemployeeinfo = await this.employeeassigninforepo.create(assigninfo)
      await this.employeeassigninforepo.save(insertassignemployeeinfo)
    }

    return 200
  }
}
