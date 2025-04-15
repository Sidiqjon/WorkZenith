import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PowerService } from './power.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

@ApiTags('Power')
@Controller('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  create(@Body() createPowerDto: CreatePowerDto) {
    return this.powerService.create(createPowerDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Limit number of items per page' })
  @ApiQuery({ name: 'search', required: false, example: '500W', description: 'Search term for name fields' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt', description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'desc', description: 'Sort order: asc or desc' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query() query?: Record<string, any>,
  ) {
    const { page: _p, limit: _l, search: _s, sortBy: _sb, sortOrder: _so, ...filter } = query || {};

    return this.powerService.findAll({
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
    return this.powerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePowerDto: UpdatePowerDto) {
    return this.powerService.update(id, updatePowerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.powerService.remove(id);
  }
}





// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { PowerService } from './power.service';
// import { CreatePowerDto } from './dto/create-power.dto';
// import { UpdatePowerDto } from './dto/update-power.dto';
// import { ApiQuery, ApiTags } from '@nestjs/swagger';

// @ApiTags('Power')
// @Controller('power')
// export class PowerController {
//   constructor(private readonly powerService: PowerService) {}

//   @Post()
//   create(@Body() createPowerDto: CreatePowerDto) {
//     return this.powerService.create(createPowerDto);
//   }

//   @Get()
//   @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
//   @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Limit number of items per page' })
//   @ApiQuery({ name: 'search', required: false, example: '500W', description: 'Search term for name fields' })
//   @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt', description: 'Field to sort by' })
//   @ApiQuery({ name: 'sortOrder', required: false, example: 'desc', description: 'Sort order: asc or desc' })
//   findAll(
//     @Query('page') page?: string,
//     @Query('limit') limit?: string,
//     @Query('search') search?: string,
//     @Query('sortBy') sortBy?: string,
//     @Query('sortOrder') sortOrder?: 'asc' | 'desc',
//     @Query() query?: Record<string, any>,
//   ) {
//     const { page: _p, limit: _l, search: _s, sortBy: _sb, sortOrder: _so, ...filter } = query || {};

//     return this.powerService.findAll({
//       page: page ? parseInt(page, 10) : undefined,
//       limit: limit ? parseInt(limit, 10) : undefined,
//       search,
//       sortBy,
//       sortOrder,
//       filter,
//     });
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.powerService.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePowerDto: UpdatePowerDto) {
//     return this.powerService.update(id, updatePowerDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.powerService.remove(id);
//   }
// }
