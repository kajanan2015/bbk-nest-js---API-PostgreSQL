import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
 
} from "@nestjs/common";
import { VehicleTypeService } from "./vehicle-type.service";
import { CreateVehicleTypeDto } from "./create-vehicle-type.dto";
import { UpdateVehicleTypeDto } from "./update-vehicle-type.dto";

@Controller("vehicle-type")
export class VehicleTypeController {
  service: any;
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Post()
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.vehicleTypeService.findById(+id);
  }

  @Put('/edit/:id')
    async uppdate(@Param('id') id: number, @Body() data: Partial<UpdateVehicleTypeDto>) {
      await this.vehicleTypeService.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'Vehicle type is updated successfully',
      };
    }
  
}
