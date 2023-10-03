import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateCompanyvehicleDto } from "./create-companyvehicle.dto";
import { UpdateCompanyvehicleDto } from "./update-companyvehicle.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { companyvehicledata } from "./companyvehicle.entity";
import { Repository } from "typeorm";
import { defaultBaseEntity } from "./defaulbase.entity";
import { fuelTypeEntity } from "./fueltype.entity";
import { licenseCategoryEntity } from "./licensecategory.entity";
import { liveryEntity } from "./livery.entity";

@Injectable()
export class CompanyvehicleService {
  constructor(
    @InjectRepository(companyvehicledata)
    private CompanyVehicleRepository: Repository<companyvehicledata>,

    @InjectRepository(defaultBaseEntity)
    private readonly defaultBaseRepository: Repository<defaultBaseEntity>,

    @InjectRepository(fuelTypeEntity)
    private readonly fuelTypeRepository: Repository<fuelTypeEntity>,

    @InjectRepository(licenseCategoryEntity)
    private readonly licenseCategoryRepository: Repository<licenseCategoryEntity>,

    @InjectRepository(liveryEntity)
    private readonly liveryRepository: Repository<liveryEntity>
  ) {}

  async create(data) {
    const CompanyVehicle = await this.CompanyVehicleRepository.create(
      data
    );
    await this.CompanyVehicleRepository.save(CompanyVehicle);
    if (CompanyVehicle) {
      return {
        statusCode: HttpStatus.OK,
        message: "successs",
      };
    } else {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "failed",
      };
    }
  }

  async getDropdownData(): Promise<{
    liveryList: any[];
    defaultBaseList: any[];
    licenseCategoryList: any[];
    fuelTypeList: any[];
  }> {
    const liveryList = await this.liveryRepository.find();
    const defaultBaseList = await this.defaultBaseRepository.find();
    const licenseCategoryList = await this.licenseCategoryRepository.find();
    const fuelTypeList = await this.fuelTypeRepository.find();

    return {
      liveryList:liveryList,
      defaultBaseList:defaultBaseList,
      licenseCategoryList:licenseCategoryList,
      fuelTypeList:fuelTypeList,
    };
  }

  async findOneCompanyVehicleDetails(id: number) {
    return await this.CompanyVehicleRepository.findOne({
      where: { id: id },
      relations: ['fuelType', 'livery', 'licenseCategory', 'defaultBase', 'company','vehicleType','addressCountry']
    });
  }

  async findAll() {
    return await this.CompanyVehicleRepository.find({relations:['fuelType', 'livery', 'licenseCategory', 'defaultBase', 'company','vehicleType','addressCountry']});
  }

  async findOne(id): Promise<companyvehicledata> {
    return this.CompanyVehicleRepository.findOne(id);
  }

  update(id: number, updateCompanyvehicleDto: UpdateCompanyvehicleDto) {
    return `This action updates a #${id} companyvehicle`;
  }

  async remove(id: number): Promise<void> {
    await this.CompanyVehicleRepository.delete(id);
  }
}
