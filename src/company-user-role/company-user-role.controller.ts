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
  Req,
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
  ) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() profileImg, @Body() data, @Req() req) {
    let prflogo = [];
    let prflogothumb;
    console.log(profileImg, 89898)
    if (profileImg.length > 0) {
      prflogo = await this.imageUploadService.upload(profileImg, "body");
      prflogothumb = await this.imageUploadService.uploadThumbnailToS3(prflogo[0])
    }
    const base_url = `${req.get('origin')}/`;
    const passdata = {
      ...data,
      profilePicture: prflogo[0],
      prfcreate: data.userId,
      company: data.companyid,
      status: 1,
    };
    return this.companyUserRoleService.create(passdata, prflogothumb, base_url);
  }

  @Post('finduserbyusingtype')
  async findbyusertype(@Body() data) {
    return this.companyUserRoleService.findbyusertype(data.type)
  }

  @Get('company_wise/:id')
  findAll(@Param("id") id) {
    return this.companyUserRoleService.findAll(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyUserRoleService.findOne(+id);
  }

  @Post('changeuserstatus/:id')
  async changeuserstatus(@Param('id') id, @Body() data) {
    console.log(id, 333)
    console.log(data, 90909)
    const response = await this.companyUserRoleService.changeuserstatus(id, data.status)
    if (response) {
      return 200;
    } else {
      return 500;
    }
  }

  @Put("/edit/:id")
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @UploadedFiles() prfImg,
    @Param("id") id,
    @Body() updateCompanyUserRoleDto
  ) {
    console.log(prfImg, 999999);
    const currentDateTime = new Date();
    let data = {
      ...updateCompanyUserRoleDto,
      updatedat: currentDateTime,
      ...(updateCompanyUserRoleDto.status
        ? { status: parseInt(updateCompanyUserRoleDto.status) }
        : {}),
    };
    delete data.userId;
    if (prfImg && prfImg.length) {
      const profilePicture = await this.imageUploadService.upload(
        prfImg,
        "body"
      );
      console.log(profilePicture, 12345);
      data = {
        ...data,
        profilePic: profilePicture[0],
        prflogothumb: await this.imageUploadService.uploadThumbnailToS3(profilePicture[0])
      };

      if (updateCompanyUserRoleDto.existprfpic) {

        delete data.existprfpic;

      }


    }


    return await this.companyUserRoleService.update(
      +id,
      data
      // updateCompanyUserRoleDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyUserRoleService.remove(+id);
  }

}
