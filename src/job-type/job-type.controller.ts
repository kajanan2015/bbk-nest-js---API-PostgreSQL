import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeDto } from './create-job-type.dto';
import { UpdateJobTypeDto } from './update-job-type.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  
  @Post()
  async create(@Body() createJobTypeDto){
    console.log(createJobTypeDto,111111)
    return await this.jobTypeService.create(createJobTypeDto);
  }

  @Get()
  findAll() {
    return this.jobTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobTypeDto) {
    return this.jobTypeService.update(+id, updateJobTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobTypeService.remove(+id);
  }
}
