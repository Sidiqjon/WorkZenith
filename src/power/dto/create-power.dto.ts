import { IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePowerDto {
  @ApiProperty({
    description: 'Name of the power in Uzbek',
    example: 'Kichik quvvat',
    required: true,
  })
  @IsNotEmpty({ message: 'nameUz is required' })
  @IsString({ message: 'nameUz must be a string' })
  nameUz: string;

  @ApiProperty({
    description: 'Name of the power in Russian',
    example: 'Маленькая мощность',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'nameRu must be a string' })
  nameRu?: string;

  @ApiProperty({
    description: 'Name of the power in English',
    example: 'Small Power',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'nameEn must be a string' })
  nameEn?: string;

  @ApiProperty({
    description: 'Power in watts',
    example: 100,
    required: true,
  })
  @IsNotEmpty({ message: 'value in watts is required' })
  @IsNumber({}, { message: 'value must be a number' })
  @Min(1, { message: 'value must be greater than 0' })
  value: number;
}
