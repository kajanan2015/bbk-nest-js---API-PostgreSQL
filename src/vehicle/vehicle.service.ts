import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateVehicleDto } from './update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}
 async create(createVehicleDto: CreateVehicleDto) {
  const vehicleType = this.vehicleRepository.create(createVehicleDto);
  await this.vehicleRepository.save(createVehicleDto);
  return vehicleType;
  }

 async findAll() {
  return await this.vehicleRepository.find(
    { where: { status: 1 } }
  );
  }

  async findOne(id: number) {
    return await this.vehicleRepository.findOne({ where:{id:id} ,relations: ['vehicletype']});
 }

  async update(id: number, updateVehicleDto: Partial<Vehicle>) {
    await this.vehicleRepository.update({ id }, updateVehicleDto);
    return await this.vehicleRepository.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
