import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDefectTripDto } from './create-defect-trip.dto';
import { UpdateDefectTripDto } from './update-defect-trip.dto';
import { DefectTrip } from './defect-trip.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TripService } from 'src/trip/trip.service';
import { MovementService } from 'src/movement/movement.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
@Injectable()
export class DefectTripService {

  constructor(
    @InjectRepository(DefectTrip)
    private defectrip: Repository<DefectTrip>,
    private readonly imageUploadServiceRepository: ImageUploadService,
    private readonly tripservice:TripService,
    private readonly vehicleservice:VehicleService
    ) {}

  async create(createDefectTripDto: CreateDefectTripDto) {
    const defectdata={
      ...createDefectTripDto,
      vehicle:createDefectTripDto.vehicleId
    }
    const response=await this.defectrip.create(createDefectTripDto);
    const data={
      res:'DEFECT',
      startMileage:createDefectTripDto.odometerReading,
      startedTime:createDefectTripDto.submitdate
    }
    const vehicledata={
      odometer:createDefectTripDto.odometerReading
    }
    await this.tripservice.update(createDefectTripDto.tripId,data);
    await this.vehicleservice.update(createDefectTripDto.vehicleId,vehicledata)
    return await this.defectrip.save(response);
  }

  async findAll() {
    return await this.defectrip.find({ 
      where: { status: 1 },
      relations: ['defectCaseResults'] 
    } );
  }

  async findDefectOne(id: number) {
    const defecttrip = await this.defectrip.findOne({ where:{tripId:id},relations: ['defectCaseResults','defectCaseResults.question','vehicle'] });
    if (!defecttrip) {
      throw new NotFoundException(` Trip ID '${id}' not found`);
    }
    return defecttrip;
    }

    async findDefectOneDateRange(id: number,fromDate,toDate) {
      const defectdriver = await this.defectrip.find({ where:{tripId:id, submitdate: Between(fromDate, toDate),},relations: ['defectCaseResults','defectCaseResults.question','vehicle'] });
      if (!defectdriver) {
        throw new NotFoundException(`Driver ID '${id}' not found`);
      }
      return defectdriver;
      }
    

 
  
    async findDefectVehicle(id: number) {
      const defectvehicle = await this.defectrip.find({ where:{vehicle:id},relations: ['defectCaseResults','defectCaseResults.question'] });
      if (!defectvehicle) {
        throw new NotFoundException(`Vehicle ID '${id}' not found`);
      }
      return defectvehicle;
      }

    async findDefectDriver(id: number) {
      const defectdriver = await this.defectrip.find({ where:{driverId:id},relations: ['defectCaseResults','defectCaseResults.question','vehicle'] });
      if (!defectdriver) {
        throw new NotFoundException(`Driver ID '${id}' not found`);
      }
      return defectdriver;
      }

      async findDefectDriverDateRange(id: number,fromDate,toDate) {
        const defectdriver = await this.defectrip.find({ where:{driverId:id, submitdate: Between(fromDate, toDate),},relations: ['defectCaseResults','defectCaseResults.question','vehicle'] });
        if (!defectdriver) {
          throw new NotFoundException(`Driver ID '${id}' not found`);
        }
        return defectdriver;
        }
        

        async findDefectVehicleDateRange(id: number,fromDate,toDate) {
          const defectvehicle = await this.defectrip.find({ where:{vehicle:id, submitdate: Between(fromDate, toDate),},relations: ['defectCaseResults','defectCaseResults.question'] });
          if (!defectvehicle) {
            throw new NotFoundException(`Vehicle ID '${id}' not found`);
          }
          return defectvehicle;
          }


 async findOne(id: number) {
  const defecttrip = await this.defectrip.findOne(id,{ relations: ['defectCaseResults'] });
  if (!defecttrip) {
    throw new NotFoundException(` ID '${id}' not found`);
  }
  return defecttrip;
  }

  async update(id: number, updateDefectTripDto: UpdateDefectTripDto) {
    await this.defectrip.update({ id }, updateDefectTripDto);
    return await this.defectrip.findOne({ id });
  }

  async remove(id: number) {
    return `This action removes a #${id} defectTrip`;
  }
}
