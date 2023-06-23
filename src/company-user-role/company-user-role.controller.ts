import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from "@nestjs/common";
import { ImageUploadService } from "src/imageupload/imageupload.service";
import { CompanyUserRoleService } from "./company-user-role.service";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";
import { UpdateCompanyUserRoleDto } from "./update-company-user-role.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("company-user-role")
export class CompanyUserRoleController {
  constructor(
    private readonly companyUserRoleService: CompanyUserRoleService,
    private readonly imageUploadService: ImageUploadService
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() profileImg, @Body() data) {
    console.log(profileImg,9090)
    console.log(data,9090)
    const prflogo = await this.imageUploadService.upload(profileImg, "body");
    console.log(prflogo,222222222222)
    const passdata = {
      ...data,
      profilePicture: prflogo[0],
      prfcreate: data.userId,
      status: 1,
    };
    return this.companyUserRoleService.create(passdata);
  }

  @Get()
  findAll() {
    return this.companyUserRoleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyUserRoleService.findOne(+id);
  }

  @Put("/edit/:id")
  @UseInterceptors(AnyFilesInterceptor())
  async update(@UploadedFiles() prfImg, @Body() updateCompanyUserRoleDto) {
    console.log(updateCompanyUserRoleDto, 999999);
    const currentDateTime = new Date();
    let data = {
      ...updateCompanyUserRoleDto.updatedValues,
      updatedat: currentDateTime,
      prfupdate: updateCompanyUserRoleDto.userId,
      ...(updateCompanyUserRoleDto.updatedValues.status
        ? { status: parseInt(updateCompanyUserRoleDto.updatedValues.status) }
        : {}),
    };
    delete data.userId;
    console.log(data, 111111);

    if (prfImg && prfImg.length) {
      const prflogo = await this.imageUploadService.upload(prfImg, "body");
      delete data.existprfpic;

      data = {
        ...data,
        profilepicture: prflogo[0],
      };
      console.log(data, 23232323);
    }
    return await this.companyUserRoleService.update(
      updateCompanyUserRoleDto.id,
      data,
      updateCompanyUserRoleDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyUserRoleService.remove(+id);
  }
}
