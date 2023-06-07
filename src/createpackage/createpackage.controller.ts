import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreatepackageService } from './createpackage.service';
import { CreateCreatepackageDto } from './create-createpackage.dto';
import { UpdateCreatepackageDto } from './update-createpackage.dto';
import { AuthGuard } from '@nestjs/passport';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard('jwt'))
@Controller('createpackage')
export class CreatepackageController {
  constructor(private readonly createpackageService: CreatepackageService,private   readonly imageUploadService: ImageUploadService,) {}

@Post()
@UseInterceptors(AnyFilesInterceptor())
 async create(@UploadedFiles() packageImg,@Body() data) {
  console.log(packageImg,345678)
    console.log(data,5678934)
    const pkglogo= await this.imageUploadService.upload(packageImg,'body')
    const passdata={
      ...data,
      packagelogo:pkglogo[0]
    }
    console.log(passdata,67890) 
  
  return this.createpackageService.create(passdata);
  }

  @Get()
  async findAll() {
    return this.createpackageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.createpackageService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCreatepackageDto: UpdateCreatepackageDto) {
    return this.createpackageService.update(+id, updateCreatepackageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.createpackageService.remove(+id);
  }
}
