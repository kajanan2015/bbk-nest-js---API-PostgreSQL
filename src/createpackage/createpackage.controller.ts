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
  constructor(private readonly createpackageService: CreatepackageService, private readonly imageUploadService: ImageUploadService,) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() packageImg, @Body() data) {
    const pkglogo = await this.imageUploadService.upload(packageImg, 'body')
    const passdata = {
      ...data,
      packagelogo: pkglogo[0],
      pkgcreate: data.userId,
      status: 1
    }
    console.log(passdata, 67890)

    return this.createpackageService.create(passdata);
  }

  @Get()
  async findAll() {
    return this.createpackageService.findAll();
  }

  @Get('paymenttype')
  async findpayment() {
    return this.createpackageService.getpayementtype();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.createpackageService.findOne(+id);
  }

  @Patch()
  @UseInterceptors(AnyFilesInterceptor())
  async update(@UploadedFiles() pkgImg, @Body() updateCreatepackageDto) {
let pkglogo=[]
    if(pkgImg){
   pkglogo = await this.imageUploadService.upload(pkgImg, 'body')
}
  
    const passdata = {
      ...updateCreatepackageDto,
      packagelogo: pkglogo[0],
      pkgcreate: updateCreatepackageDto.userId,
      status: 1
    }
    console.log(passdata, 67890)

return await this.createpackageService.update(updateCreatepackageDto.id,updateCreatepackageDto);
    // return this.createpackageService.create(passdata);




    console.log(updateCreatepackageDto, 8888);
    const currentDateTime = new Date(); // Current date and time
    let data = {
      // ...updateCreatepackageDto.updatedValues,
      updatedat: currentDateTime,
      pkgupdate: updateCreatepackageDto.userId,
      ...(updateCreatepackageDto.updatedValues.status ? { status:parseInt(updateCreatepackageDto.updatedValues.status)} : {}),
   
    };
    // delete data.userId;
    console.log(data,888)
    // if (pkgImg) {
    //   const pkglogo = await this.imageUploadService.upload(pkgImg, 'body');
    //   delete data.existlogo;

    //   data = {
    //     ...data,
    //     packagelogo: pkglogo[0]
    //   }
    //   console.log(data, 67890)
    // }
    console.log('fghjk')
    // return await this.createpackageService.update(updateCreatepackageDto.id,data,updateCreatepackageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.createpackageService.remove(+id);
  }

  @Post('packagecheck')
  async checkemailexist(@Body() data: any) {
    const existing = await this.createpackageService.findPackageNameExist(data.packagename);
    if (existing) {
      return "package exist";
    } else {
      return 'package not exist'
    }
  }

}
