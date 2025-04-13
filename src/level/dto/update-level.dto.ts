import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @ApiPropertyOptional({
    description: 'Updated level name in Uzbek',
    example: 'O‘rta',
  })
  nameUz?: string;

  @ApiPropertyOptional({
    description: 'Updated level name in Russian',
    example: 'Средний',
  })
  nameRu?: string;

  @ApiPropertyOptional({
    description: 'Updated level name in English',
    example: 'Intermediate',
  })
  nameEn?: string;
}
