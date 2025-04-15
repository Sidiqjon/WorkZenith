import { IsOptional, IsString, IsEnum, IsUUID, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'First name of the user',
    example: 'John',
  })
  @IsOptional()
  @IsString({ message: 'firstName must be a string' })
  @Matches(/^[A-Za-z']+$/, { message: 'firstName can only contain letters and apostrophes' })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsOptional()
  @IsString({ message: 'lastName must be a string' })
  @Matches(/^[A-Za-z']+$/, { message: 'lastName can only contain letters and apostrophes' })
  lastName?: string;

  @ApiPropertyOptional({
    description: 'ID of the region the user belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('all', { message: 'regionId must be a valid UUID' })
  regionId?: string;

  // @ApiPropertyOptional({
  //   description: 'Status of the user',
  //   example: 'ACTIVE',
  //   enum: UserStatus,
  // })
  @IsOptional()
  @IsEnum(UserStatus, { message: 'status must be a valid user status' })
  status?: UserStatus;
}
