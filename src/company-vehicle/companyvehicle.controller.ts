import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  UploadedFiles,
} from "@nestjs/common";
import { CompanyvehicleService } from "./companyvehicle.service";
import { CreateCompanyvehicleDto } from "./create-companyvehicle.dto";
import { UpdateCompanyvehicleDto } from "./update-companyvehicle.dto";
import { AuthGuard } from "@nestjs/passport";
import { ImageUploadService } from "src/imageupload/imageupload.service";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard("jwt"))
@Controller("companyvehicle")
export class CompanyvehicleController {
  constructor(
    private readonly companyvehicleService: CompanyvehicleService,
    private readonly imageUploadService: ImageUploadService
  ) {}

  @Get("dropdowns")
  async getDropdownData() {
    const dropdownData = await this.companyvehicleService.getDropdownData();
    return {
      statusCode: HttpStatus.OK,
      data: dropdownData,
    };
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() vehicleFiles, @Body() data) {
    const filename = await this.imageUploadService.uploadcompany(
      vehicleFiles,
      "body"
    );

    const images = filename.find((file) => file.hasOwnProperty(`imageDoc[]`));
    const vehicleImg = images ? images["imageDoc[]"][0] : null;

    const documents = filename.find((file) => file[`DocumentDoc[]`]);
    const filesArray = documents ? documents[`DocumentDoc[]`] : null;

    const passdata = {
      ...data,
      vehicleImg: vehicleImg,
      filesArray: filesArray,
    };
    console.log(passdata, 123456);
    return this.companyvehicleService.create(passdata);
  }

  @Get("/company-one-vehicle/:id")
  findOne(@Param("id") id: number) {
    return this.companyvehicleService.findOneCompanyVehicleDetails(+id);
  }

  @Get("vehicle-details")
  findAll() {
    return this.companyvehicleService.findAll();
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyvehicleDto: UpdateCompanyvehicleDto
  ) {
    return this.companyvehicleService.update(+id, updateCompanyvehicleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyvehicleService.remove(+id);
  }
}
