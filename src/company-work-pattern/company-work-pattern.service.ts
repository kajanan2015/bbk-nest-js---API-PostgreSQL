import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { Repository } from 'typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
@Injectable()
export class CompanyWorkPatternService {
  constructor(
    @InjectRepository(CompanyWorkPattern)
    private readonly patternrepository: Repository<CompanyWorkPattern>,
    private readonly systemcodeService: SystemCodeService,
    @InjectRepository(EmployeeDataHistory)
    private readonly employedatahistory: Repository<EmployeeDataHistory>,
  ) { }
  async create(createCompanyWorkPatternDto: CreateCompanyWorkPatternDto) {
    await this.findbypattername(createCompanyWorkPatternDto.workPatternName, createCompanyWorkPatternDto.company)
    const responsesystemcode = await this.systemcodeService.findOne("workpattern");
    const systemcode = responsesystemcode.code + "" + responsesystemcode.startValue;
    const newstartvalue = {
      startValue: responsesystemcode.startValue + 1,
    };
    createCompanyWorkPatternDto.workPatternCode = systemcode;
    createCompanyWorkPatternDto.workType = 0;
    const response = await this.patternrepository.create(createCompanyWorkPatternDto)
    const withputtimepattern = await this.patternrepository.save(response);

    
    //const responsehistorywithputtime = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(response), company:createCompanyWorkPatternDto.company,createdBy:createCompanyWorkPatternDto.patterncreate,workpattern:withputtimepattern});

    //const reswithputtime = await this.employedatahistory.save(responsehistorywithputtime);
    createCompanyWorkPatternDto.workType = 1;
    const response2 = await this.patternrepository.create(createCompanyWorkPatternDto)
    const withtimepattern = await this.patternrepository.save(response2)
    await this.systemcodeService.update(responsesystemcode.id, newstartvalue);
    //const responsehistorywithouttime = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(response2), company:createCompanyWorkPatternDto.company,createdBy:createCompanyWorkPatternDto.patterncreate, workpattern: withtimepattern});
   // const reswithouttime = await this.employedatahistory.save(responsehistorywithouttime);
    if (withputtimepattern && withtimepattern) {
      return "successfully created"
    } else {
      return "error occured"
    }
  }

  async findAll() {
    return await this.patternrepository.find({ relations: ['company', 'patterncreate'] })
  }

  async findbypattername(name: string, companyId) {
   // const pattern = await this.patternrepository.find({ where: { workPatternName: name, company: companyId } });
    // if (pattern.length > 0) {
    //   return "name exist"
    // }
  }

  async findOne(id: number) {
    const workpattern = await this.patternrepository.findOne(id);
    if (!workpattern) {
      throw new NotFoundException(` ID '${id}' not found`);
    }
    return workpattern;
  }

  async update(id: number, updateCompanyWorkPatternDto: UpdateCompanyWorkPatternDto) {
    const data = await this.patternrepository.findOne(id)

    const response = await this.patternrepository.find({ where: { workPatternCode: data.workPatternCode } })

            
    for (const data of response) {

           await this.patternrepository.update(data['id'], updateCompanyWorkPatternDto);
            // Find the previous record of the employee
            const previousRecord = await this.employedatahistory.findOne({
              where: {
                workpattern:data['id'],
                company: data['company'].id,
                type: "work-pattern-history"
              },
              order: { createdBy: 'DESC' },
            });
        
            // If a previous record exists, update its endDate
            // if (previousRecord) {
            //   previousRecord.endDate = new Date(Date.now());
            //   previousRecord.editedBy=updateCompanyWorkPatternDto.patternupdate;
            //   await this.employedatahistory.save(previousRecord);
            // }
            // const updateresponse = await this.employedatahistory.create({ type:"work-pattern-history", data: JSON.stringify(updateCompanyWorkPatternDto), company:data['company'].id,createdBy:updateCompanyWorkPatternDto.patternupdate, workpattern: data['id']});
            // const res = await this.employedatahistory.save(updateresponse);


    }
    return "updated success"
  }

  remove(id: number) {
    return `This action removes a #${id} companyWorkPattern`;
  }
}
