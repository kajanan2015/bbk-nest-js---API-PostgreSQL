import { HttpStatus, Injectable } from '@nestjs/common';
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
   
    const jobTypeDetails = await this.jobTypeRepository.create(createJobTypeDto);
    const response =await this.jobTypeRepository.save(jobTypeDetails);

    if (response) {
      return {
        statusCode: HttpStatus.OK,
        message: 200,
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 500,
      };
    }
   
  }

  async findAll() {
    return await this.jobTypeRepository.find(
    );
    }

  async findOne(id: number) {
    return await this.jobTypeRepository.findOne({ where:{id:id} ,relations: ['company']});
  }

  async update(id: number, updateJobTypeDto: Partial<JobType>) {
    await this.jobTypeRepository.update({ id }, updateJobTypeDto);
   const response =   await this.jobTypeRepository.findOne({ id });
   if (response) {
    return {
      statusCode: HttpStatus.OK,
      message: 200,
    };
  } else {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 500,
    };
  }
  }

  remove(id: number) {
    return `This action removes a #${id} jobType`;
  }
}
