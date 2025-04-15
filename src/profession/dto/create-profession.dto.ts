import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, Matches } from 'class-validator';

const regexUzRuEn = /^[\p{L}0-9\s.'\-]+$/u;

export class CreateProfessionDto {
  @ApiProperty({ example: "Elektrik", description: "Profession name in Uzbek" })
  @IsNotEmpty()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameUz must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameUz: string;

  @ApiProperty({ example: "Электрик", description: "Profession name in Russian", required: false })
  @IsOptional()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameRu must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameRu?: string;

  @ApiProperty({ example: "Electrician", description: "Profession name in English", required: false })
  @IsOptional()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameEn must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameEn?: string;

  @ApiProperty({ example: "electrician.jpg", description: "Image file name" })
  @IsNotEmpty()
  @IsString()
  img: string;

  @ApiProperty({ example: true, description: "Is active status" })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
