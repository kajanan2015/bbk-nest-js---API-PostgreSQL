import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Between, Repository } from 'typeorm';
import { TripDTO } from './trip.dto';
import { TripEntity } from './trip.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

    @Injectable()
    export class TripService {
      constructor(
        @InjectRepository(TripEntity)
        private tripRepository: Repository<TripEntity>,
        private readonly vehicleservice:VehicleService
      ) {}

      async showAll() {
          const trip=await this.tripRepository.find({where:{status:1} ,relations: ['jobuser']});
            trip.forEach(trip => {
              delete trip.jobuser.password;
            });
        return trip;
      }

      async create(data: TripDTO) {
        const company = this.tripRepository.create(data);
        await this.tripRepository.save(data);
        return company;
      }

      async findById(id: number): Promise<TripDTO> {
        return await this.tripRepository.findOne({ id });
      }

      async findByName(name: string): Promise<TripEntity> {
        const company = await this.tripRepository.findOne({ name });
        if (!company) {
          throw new NotFoundException(`Company with name '${name}' not found`);
        }
        return company;
      }
      
      async read(id: number) {
        return await this.tripRepository.findOne({ where: { id: id } });
      }


      async jobdatabyuser(id: number) {
        return await this.tripRepository.findOne({ where: { jobuser: id },relations: ['vehicle'] });
      }
      


      async jobdatabyuserdaterange(id: number,fromDate,toDate,sortColumn) {
       
        return await this.tripRepository.findOne({ where: { jobuser: id,[sortColumn]: Between(fromDate, toDate)},relations: ['vehicle'] });
      }
      
      async update(id: number, data: Partial<TripDTO>) {
        if(data.endMileage){
          const updatevehicledata={
            odometer:data.endMileage
          }
          const datavehicle=await this.tripRepository.findOne({where:{id:id},relations: ['vehicle']});
          await this.vehicleservice.update(datavehicle.vehicle.id,updatevehicledata)
        }
       
        await this.tripRepository.update({ id }, data);
        return await this.tripRepository.findOne({ id });
      }

      async destroy(id: number) {
        await this.tripRepository.delete({ id });
        return { deleted: true };
      }
    
    }