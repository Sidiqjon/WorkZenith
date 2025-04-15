import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, Matches } from 'class-validator';

const regexUzRuEn = /^[\p{L}0-9\s.'\-]+$/u;

export class UpdateProfessionDto {
  @ApiPropertyOptional({ example: "Elektrik", description: "Profession name in Uzbek" })
  @IsOptional()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameUz must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameUz?: string;

  @ApiPropertyOptional({ example: "Электрик", description: "Profession name in Russian" })
  @IsOptional()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameRu must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameRu?: string;

  @ApiPropertyOptional({ example: "Electrician", description: "Profession name in English" })
  @IsOptional()
  @IsString()
  @Matches(regexUzRuEn, { message: 'nameEn must contain only letters, numbers, spaces, dots, dashes or apostrophes' })
  nameEn?: string;

  @ApiPropertyOptional({ example: "electrician_updated.jpg", description: "Updated image filename" })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiPropertyOptional({ example: true, description: "Is active status" })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
