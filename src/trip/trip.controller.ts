import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    Patch,
    UseGuards,
  } from '@nestjs/common';
import { TripDTO } from './trip.dto';

  import { TripService } from './trip.service';
import { AuthGuard } from '@nestjs/passport';
  @UseGuards(AuthGuard('jwt'))
  @Controller('trip')
  export class TripController {
    constructor(private service: TripService) {}
    
    @Get()
    async showAll() {
      const Trip =  await this.service.showAll();
      return {
        statusCode: HttpStatus.OK,
        Trip
      };
    }

    @Post()
    async create(@Body() data: TripDTO) {
       const trip = await this.service.create(data);
      return {
        statusCode: HttpStatus.OK,
        trip
      };
    }

    @Get(':id')
    async read(@Param('id') id: number) {
      const trip =  await this.service.read(id);
      return {
        statusCode: HttpStatus.OK,
        trip,
      };
    }

    @Put('/edit/:id')
    async uppdate(@Param('id') id: number, @Body() data: Partial<TripDTO>) {

      await this.service.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'trip updated successfully',
      };
    }
  }