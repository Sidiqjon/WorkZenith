import {
    IsString,
    IsOptional,
    IsNumber,
    Min,
    Max,
    IsEnum,
  } from 'class-validator';
  import { TimeUnit } from '@prisma/client';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateBasketDto {
    @ApiProperty({ example: 'uuid-of-profession', required: false })
    @IsOptional()
    @IsString()
    professionId?: string;
  
    @ApiProperty({ example: 'uuid-of-tool', required: false })
    @IsOptional()
    @IsString()
    toolId?: string;
  
    @ApiProperty({ example: 'uuid-of-level', required: false })
    @IsOptional()
    @IsString()
    levelId?: string;
  
    @ApiProperty({ example: 1, description: 'Quantity', minimum: 1 })
    @IsNumber()
    @Min(1)
    quantity: number;
  
    @ApiProperty({ enum: TimeUnit, example: 'HOURLY', description: 'Time unit' })
    @IsEnum(TimeUnit)
    timeUnit: TimeUnit;
  
    @ApiProperty({ example: 8, description: 'Working time in hours/days' })
    @IsNumber()
    @Min(0)
    workingTime: number;
  
    @ApiProperty({ example: 100.5, description: 'Price' })
    @IsNumber()
    @Min(0)
    price: number;
  }