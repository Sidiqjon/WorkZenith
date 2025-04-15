import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(UserRole.INDIVIDUAL, UserRole.COMPANY, UserRole.ADMIN)
  create(@Req() req, @Body() dto: CreateContactDto) {
    const userId = req.user.id;
    return this.contactService.create(dto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.VIEWERADMIN)
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  findAll(@Query() query: any) {
    return this.contactService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.contactService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.contactService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
