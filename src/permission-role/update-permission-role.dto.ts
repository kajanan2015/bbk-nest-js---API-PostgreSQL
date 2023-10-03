import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionRoleDto } from './create-permission-role.dto';

export class UpdatePermissionRoleDto extends PartialType(CreatePermissionRoleDto) {}
