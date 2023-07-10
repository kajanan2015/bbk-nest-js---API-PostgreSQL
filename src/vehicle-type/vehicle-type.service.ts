import { Injectable } from "@nestjs/common";
import { CreateVehicleTypeDto } from "./create-vehicle-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VehicleTypeEntity } from "./vehicle-type.entity";

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectRepository(VehicleTypeEntity)
    private vehicletypeRepository: Repository<VehicleTypeEntity>,
  ) {}


  async create(data: CreateVehicleTypeDto) {
    const vehicleType = this.vehicletypeRepository.create(data);
    await this.vehicletypeRepository.save(data);
    return vehicleType;
  }

  async findAll() {
    return await this.vehicletypeRepository.find(
      { where: { status: 1 } }
    );
  }

  async findById(id: number): Promise<CreateVehicleTypeDto> {
    return await this.vehicletypeRepository.findOne({ id });
  }

  async update(id: number, data: Partial<CreateVehicleTypeDto>) {
    await this.vehicletypeRepository.update({ id }, data);
    return await this.vehicletypeRepository.findOne({ id });
  }

  async findBycompanyId(id:number){
    return await this.vehicletypeRepository.findOne({where:{ company:id }});
  }


  
}
