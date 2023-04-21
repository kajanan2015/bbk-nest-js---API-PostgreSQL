import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { CreateUserDto } from 'src/user/user.dto';
export class UpdateEmployeeDto extends PartialType(CreateUserDto) {}
