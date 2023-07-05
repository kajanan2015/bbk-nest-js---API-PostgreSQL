import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyWorkPattern } from './company-work-pattern.entity';
import { Repository } from 'typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';
@Injectable()
export class CompanyWorkPatternService {
  constructor(
    @InjectRepository(CompanyWorkPattern)
    private readonly patternrepository: Repository<CompanyWorkPattern>,
    private readonly systemcodeService: SystemCodeService,
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
    createCompanyWorkPatternDto.workType = 1;
    const response2 = await this.patternrepository.create(createCompanyWorkPatternDto)
    const withtimepattern = await this.patternrepository.save(response2)
    await this.systemcodeService.update(responsesystemcode.id, newstartvalue);

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
    const pattern = await this.patternrepository.find({ where: { workPatternName: name, company: companyId } });
    if (pattern.length > 0) {
      return "name exist"
    }
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
    }
    return "updated success"
  }

  remove(id: number) {
    return `This action removes a #${id} companyWorkPattern`;
  }
}
