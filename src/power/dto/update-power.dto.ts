import { PartialType } from '@nestjs/mapped-types';
import { CreatePowerDto } from './create-power.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePowerDto extends PartialType(CreatePowerDto) {
  @ApiPropertyOptional({
    description: 'Updated name of the power in Uzbek',
    example: '1000W',
  })
  nameUz?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the power in Russian',
    example: '1000Вт',
  })
  nameRu?: string;

  @ApiPropertyOptional({
    description: 'Updated name of the power in English',
    example: '1000W',
  })
  nameEn?: string;
}
