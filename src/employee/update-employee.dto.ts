import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/user.dto';
export class UpdateEmployeeDto extends PartialType(CreateUserDto) {}
