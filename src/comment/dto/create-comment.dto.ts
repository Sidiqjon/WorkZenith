import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsNumber,
    Min,
    Max,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateMasterRatingDto {
    @ApiProperty({ example: 'uuid-of-master', description: 'ID of an existing master' })
    @IsString()
    @IsNotEmpty()
    masterId: string;
  
    @ApiProperty({ example: 4.5, description: 'Star rating (0 to 5)' })
    @IsNumber()
    @Min(0)
    @Max(5)
    star: number;
  }
  
  export class CreateCommentDto {
    @ApiProperty({ example: 'Great service!', description: 'Comment message' })
    @IsString()
    @IsNotEmpty()
    message: string;
  
    @ApiProperty({ example: 'uuid-of-order', description: 'ID of an existing order' })
    @IsString()
    @IsNotEmpty()
    orderId: string;
  
    @ApiProperty({
      type: [CreateMasterRatingDto],
      description: 'List of master ratings',
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMasterRatingDto)
    masterRatings: CreateMasterRatingDto[];
  }