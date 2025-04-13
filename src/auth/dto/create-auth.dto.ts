import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Alex Fergison' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Alex Fergison' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  lastName: string;

  @ApiProperty({ example: '+998953901313' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{2}\d{7}$/, {
    message: 'The phoneNumber number format must be only: +998901234567.',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'root' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @ApiProperty({ example: 'region_id' })
  @IsString()
  @IsNotEmpty()
  regionId: string;

  @ApiProperty({ example: 'USER_FIZ' })
  @IsString()
  @IsNotEmpty()
  role: 'INDIVIDUAL' | 'COMPANY';
}

export class LoginAuthDto extends PickType(CreateAuthDto, [
  'phoneNumber',
  'password',
]) {}

export class SendOtpDto extends PickType(CreateAuthDto, ['phoneNumber']) {}

export class ActivateDto extends PickType(CreateAuthDto, ['phoneNumber']) {
  @ApiProperty({ example: '091211' })
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ResetPasswordDto extends PickType(ActivateDto, ['phoneNumber', 'otp']) {
  @ApiProperty({ example: 'root1234' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'The password must contain only letters and numbers.',
  })
  @MinLength(4)
  @MaxLength(32)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refreshToken' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
