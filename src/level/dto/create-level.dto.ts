import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty({
    description: 'Level name in Uzbek',
    example: 'Boshlang\'ich',
    required: true,
  })
  @IsNotEmpty({ message: 'nameUz is required' })
  @IsString({ message: 'nameUz must be a string' })
  @Matches(/^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳʼ\s\-’]+$/, {
    message: 'nameUz should contain only letters',
  })
  nameUz: string;

  @ApiProperty({
    description: 'Level name in Russian',
    example: 'Начальный',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'nameRu must be a string' })
  @Matches(/^[A-Za-zА-Яа-яЁёЎўҚқҒғҲҳʼ\s\-’]+$/, {
    message: 'nameRu should contain only letters',
  })
  nameRu?: string;

  @ApiProperty({
    description: 'Level name in English',
    example: 'Beginner',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'nameEn must be a string' })
  @Matches(/^[A-Za-z\s\-’]+$/, {
    message: 'nameEn should contain only letters',
  })
  nameEn?: string;
}
