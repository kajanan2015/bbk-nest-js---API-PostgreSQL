import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { SubCompaniesService } from "./sub-companies.service";
import { CreateSubCompanyDto } from "./create-sub-company.dto";
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller("sub-companies")
export class SubCompaniesController {
  constructor(private readonly subCompaniesService: SubCompaniesService) {}

  @Get()
  async findAll() {
    const subCompanies = await this.subCompaniesService.findAll();
    return subCompanies;
  }

  @Post()
  create(@Body() createSubCompanyDto: CreateSubCompanyDto) {
    return this.subCompaniesService.create(createSubCompanyDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subCompaniesService.findById(+id);
  }

  @Put("/edit/:id")
  async update(
    @Param("id") id: number,
    @Body() data: Partial<CreateSubCompanyDto>
  ) {
    await this.subCompaniesService.update(id, data);
  }
}
