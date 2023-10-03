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
import { MovementService } from './movement.service';
import { CreateMovementDto } from './create-movement.dto';
import { UpdateMovementDto } from './update-movement.dto';

import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}
  @Get()
  async showAll() {
    const Trip =  await this.movementService.showAll();
    return {
      statusCode: HttpStatus.OK,
      Trip
    };
  }

  @Post()
  async create(@Body() data: CreateMovementDto) {
     const trip = await this.movementService.create(data);
    return {
      statusCode: HttpStatus.OK,
      trip
    };
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const trip =  await this.movementService.read(id);
    return {
      statusCode: HttpStatus.OK,
      trip,
    };
  }

  @Put('/edit/:id')
  async uppdate(@Param('id') id: number, @Body() data: Partial<CreateMovementDto>) {

    await this.movementService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'trip updated successfully',
    };
  }
}