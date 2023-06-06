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
  async create(@UploadedFiles() moduleImg ,@Body() createCreatemoduleDto: CreateCreatemoduleDto) {
    console.log(moduleImg,345678)
    console.log(createCreatemoduleDto,5678934)
    const modulelogo= await this.imageUploadService.upload(moduleImg,'body')
    const data={
      ...createCreatemoduleDto,
      modulelogo:modulelogo[0]
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
  async update(@Param('id') id: string, @Body() updateCreatemoduleDto: UpdateCreatemoduleDto) {
    return this.createmoduleService.update(+id, updateCreatemoduleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.createmoduleService.remove(+id);
  }
}
