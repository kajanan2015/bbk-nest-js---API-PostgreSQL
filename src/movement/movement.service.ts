import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovementDto } from './create-movement.dto';
import { UpdateMovementDto } from './update-movement.dto';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { Movement } from './movement.entity';
@Injectable()
export class MovementService {
   constructor(
        @InjectRepository(Movement)
        private movementRepository: Repository<Movement>,
        private readonly vehicleservice:VehicleService
      ) {}
   async showAll() {
          const trip=await this.movementRepository.find({where:{status:1} ,relations: ['jobuser']});
            trip.forEach(trip => {
              delete trip.jobuser.password;
            });
        return trip;
      }

      async create(data: CreateMovementDto) {
        const company = this.movementRepository.create(data);
        await this.movementRepository.save(data);
        return company;
      }

      async findById(id: number): Promise<CreateMovementDto> {
        return await this.movementRepository.findOne({ id });
      }

      async findByName(name: string): Promise<CreateMovementDto> {
        const company = await this.movementRepository.findOne({ name });
        if (!company) {
          throw new NotFoundException(`Company with name '${name}' not found`);
        }
        return company;
      }
      
      async read(id: number) {
        return await this.movementRepository.findOne({ where: { id: id } });
      }

      async update(id: number, data: Partial<CreateMovementDto>) {
        if(data.endMileage){
          const updatevehicledata={
            odometer:data.endMileage
          }
          const datavehicle=await this.movementRepository.findOne({where:{id:id},relations: ['vehicle']});
          await this.vehicleservice.update(datavehicle.vehicle.id,updatevehicledata)
        }
       
        await this.movementRepository.update({ id }, data);
        return await this.movementRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.movementRepository.delete({ id });
        return { deleted: true };
      }
}
