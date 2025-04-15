import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Profession')
@Controller('profession')
export class ProfessionController {
  constructor(private readonly service: ProfessionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  create(@Body() dto: CreateProfessionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'Elektrik' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'desc' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query() query?: Record<string, any>,
  ) {
    const { page: _p, limit: _l, search: _s, sortBy: _sb, sortOrder: _so, ...filter } = query || {};

    return this.service.findAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
      sortBy,
      sortOrder,
      filter,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateProfessionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
