import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDriverDto } from './create-driver.dto';
import { UpdateDriverDto } from './update-driver.dto';
import { DriverEntity } from './driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private readonly userService:UserService
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    const driver = this.driverRepository.create(createDriverDto);
    const existing = await this.userService.findByEmail(createDriverDto.driverEmail);
    if (existing) {
      throw new BadRequestException('auth/account-exists');
    }
    const response=await this.driverRepository.save(driver);
    const driver_id=response.id;
    await this.userService.create(
      createDriverDto.driverName, 
      createDriverDto.driverEmail, 
      createDriverDto.driverPassword,
      "DRIVER",
      null, 
      driver_id);
    return this.driverRepository.save(driver);
  }

  async findAll() {
    return await this.driverRepository.find(
      { where: { driverStatus: 1 } }
    );
  }

  async findById(id: number): Promise<CreateDriverDto> {
    return await this.driverRepository.findOne({ id });
  }

  async update(id: number, data: Partial<CreateDriverDto>) {
    await this.driverRepository.update({ id }, data);
    return await this.driverRepository.findOne({ id });
  }
}
