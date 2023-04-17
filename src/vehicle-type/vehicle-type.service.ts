import { Injectable } from "@nestjs/common";
import { CreateVehicleTypeDto } from "./create-vehicle-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VehicleTypeEntity } from "./vehicle-type.entity";

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleTypeEntity)
    private vehicleRepository: Repository<VehicleTypeEntity>,
  ) {}


  async create(data: CreateVehicleTypeDto) {
    const vehicleType = this.vehicleRepository.create(data);
    await this.vehicleRepository.save(data);
    return vehicleType;
  }

  async findAll() {
    return await this.vehicleRepository.find(
      { where: { status: 1 } }
    );
  }

  async findById(id: number): Promise<CreateVehicleTypeDto> {
    return await this.vehicleRepository.findOne({ id });
  }

  async update(id: number, data: Partial<CreateVehicleTypeDto>) {
    await this.vehicleRepository.update({ id }, data);
    return await this.vehicleRepository.findOne({ id });
  }


  
}
