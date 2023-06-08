import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreatemoduleService } from './createmodule.service';
import { CreateCreatemoduleDto } from './create-createmodule.dto';
import { UpdateCreatemoduleDto } from './update-createmodule.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';


@UseGuards(AuthGuard('jwt'))
@Controller('createmodule')
export class CreatemoduleController {
  constructor(private readonly createmoduleService: CreatemoduleService,private   readonly imageUploadService: ImageUploadService,) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() moduleImg ,@Body() createCreatemoduleDto) {
    console.log(moduleImg,345678)
    console.log(createCreatemoduleDto,5678934)
    const modulelogo= await this.imageUploadService.upload(moduleImg,'body')
    const data={
      modulename:createCreatemoduleDto.moduleName,
      modulelogo:modulelogo[0],
      modulecreate:createCreatemoduleDto.userId,
      status:1
    }
    console.log(data,67890)
    return this.createmoduleService.create(data);
  }



  @Get()
  async findAll() {
    return this.createmoduleService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    return this.createmoduleService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Param('id') id: string, @UploadedFiles() moduleImg, @Body() updateCreatemoduleDto: UpdateCreatemoduleDto) {
    console.log(updateCreatemoduleDto,8888);
    const currentDateTime = new Date(); // Current date and time
    let data={
      ...updateCreatemoduleDto,
      updatedat:currentDateTime,
      moduleupdate:updateCreatemoduleDto.userId
    };
    delete data.userId;
    if(updateCreatemoduleDto.existlogo){
      const modulelogo= await this.imageUploadService.upload(moduleImg,'body');
      delete data.existlogo;
     
      data={
        ...data,
        modulelogo:modulelogo[0]
      }
      console.log(data,67890)
    }
    // console.log(data,67890)
    return this.createmoduleService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.createmoduleService.remove(+id);
  }
}
