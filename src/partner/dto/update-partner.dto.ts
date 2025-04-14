import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from './create-partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {
  @ApiPropertyOptional({ description: 'Updated nameUz', example: 'Yangi Hamkorlik' })
  nameUz?: string;

  @ApiPropertyOptional({ description: 'Updated nameRu', example: 'Новый партнёр' })
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Updated nameEn', example: 'New Partner' })
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Updated image filename', example: 'updated-partner.jpg' })
  image?: string;
}
