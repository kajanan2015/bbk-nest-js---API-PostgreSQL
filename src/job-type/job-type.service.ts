import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './create-job-type.dto';
import { UpdateJobTypeDto } from './update-job-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from './job-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobTypeService {

  constructor(
    @InjectRepository(JobType)
    private jobTypeRepository: Repository<JobType>,
  ) {}

  async create(createJobTypeDto) {
    const jobTypeDetails = this.jobTypeRepository.create(createJobTypeDto);
    await this.jobTypeRepository.save(createJobTypeDto);
    return jobTypeDetails;
   
  }

  async findAll() {
    return await this.jobTypeRepository.find(
      { where: { jobtypestatus: 1 } }
    );
    }

  async findOne(id: number) {
    return await this.jobTypeRepository.findOne({ where:{id:id} ,relations: ['company']});
  }

  async update(id: number, updateJobTypeDto: Partial<JobType>) {
    await this.jobTypeRepository.update({ id }, updateJobTypeDto);
    return await this.jobTypeRepository.findOne({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} jobType`;
  }
}
