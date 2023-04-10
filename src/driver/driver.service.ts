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

  findAll() {
    return `This action returns all driver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
