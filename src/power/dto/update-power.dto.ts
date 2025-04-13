import { PartialType } from '@nestjs/mapped-types';
import { CreatePowerDto } from './create-power.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePowerDto extends PartialType(CreatePowerDto) {
  @ApiPropertyOptional({
    description: 'Updated name of the power in Uzbek',
    example: 'O\'rta quvvat',
  })
  nameUz?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the power in Russian',
    example: 'Средняя мощность',
  })
  nameRu?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the power in English',
    example: 'Medium Power',
  })
  nameEn?: string;

  @ApiPropertyOptional({
    description: 'Updated power value in watts',
    example: 150,
  })
  value?: number;
}
