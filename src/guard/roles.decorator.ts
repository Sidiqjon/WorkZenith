// export enum UserRole {
//     ADMIN = 'ADMIN',
//     SUPERADMIN = 'SUPERADMIN',
//     VIEWERADMIN = 'VIEWERADMIN',
//     INDIVIDUAL = 'INDIVIDUAL',
//     COMPANY = 'COMPANY',
//   }
  
//   import { SetMetadata } from '@nestjs/common';
  
//   export const ROLES_KEY = 'roles';
//   export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
  
import { SetMetadata } from '@nestjs/common';
// import { UserRole } from '@prisma/client';
import { UserRole } from '../admin/dto/create-admin.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
