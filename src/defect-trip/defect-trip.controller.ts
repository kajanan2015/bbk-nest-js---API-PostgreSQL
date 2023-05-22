import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpStatus, UseGuards } from '@nestjs/common';
import { DefectTripService } from './defect-trip.service';
import { CreateDefectTripDto } from './create-defect-trip.dto';
import { UpdateDefectTripDto } from './update-defect-trip.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('defect-trip')
export class DefectTripController {

  constructor(private readonly defectTripService: DefectTripService,private   readonly imageUploadService: ImageUploadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() vehicleRegPhoto ,@Body() createDefectTripDto: CreateDefectTripDto) {
   
    const filename=await this.imageUploadService.uploadmobiledefect(vehicleRegPhoto , "body");
    const data={
      ...createDefectTripDto,
      "vehicleRegPhoto":filename
    }
    const defecttrip=await this.defectTripService.create(data);
    return {
      statusCode: HttpStatus.OK,
      defecttrip
    };
  }

  @Get()
  async findAll() {
    return this.defectTripService.findAll();
  }

  @Get('/finddefectbytrip/:id')
  async  findDefectOne(@Param('id') tripid: string) {
     return this.defectTripService.findDefectOne(+tripid);
   }

   @Get('/finddefectbytripbydaterange/:id')
   async  findDefectOneDateRange(@Param('id') tripid: string, @Body('fromDate') fromDate: Date,
   @Body('toDate') toDate: Date) {
      return this.defectTripService.findDefectOneDateRange(+tripid,fromDate,toDate);
    }

   @Post('/finddefectbyvehicledaterange/:id')
   async  findDefectvehicleDateRange(@Param('id') vehicleid: string, @Body('fromDate') fromDate: Date,
   @Body('toDate') toDate: Date) {
      return this.defectTripService.findDefectVehicleDateRange(+vehicleid,fromDate,toDate);
    }

    @Post('/finddefectbydriverdaterange/:id')
    async  findDefectDriverDateRange(@Param('id') driverId: string, @Body('fromDate') fromDate: Date,
    @Body('toDate') toDate: Date) {
       return this.defectTripService.findDefectDriverDateRange(+driverId,fromDate,toDate);
     }

     @Get('/finddefectbyvehicle/:id')
     async  findDefectvehicle(@Param('id') vehicleid: string) {
        return this.defectTripService.findDefectVehicle(+vehicleid);
      }
 

    @Get('/finddefectbydriver/:id')
    async  findDefectDriver(@Param('id') driverid: string) {
       return this.defectTripService.findDefectDriver(+driverid);
     }


  @Get(':id')
 async  findOne(@Param('id') id: string) {
    return this.defectTripService.findOne(+id);
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateDefectTripDto: UpdateDefectTripDto) {
    return this.defectTripService.update(+id, updateDefectTripDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.defectTripService.remove(+id);
  }
}
