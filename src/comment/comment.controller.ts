import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { UserRole } from '../guard/role-enum';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INDIVIDUAL, UserRole.COMPANY)
  @ApiOperation({ summary: 'Create a comment (USER or COMPANY who has a completed order)' })
  create(@Body() dto: CreateCommentDto, @Req() req:any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.commentService.create(dto, userId, userRole);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all comments' })
  findAll(@Req() req:any) {  
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.commentService.findAll(userId, userRole);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a single comment by ID' })
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.commentService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INDIVIDUAL, UserRole.COMPANY)
  @ApiOperation({ summary: 'Update a comment (ADMIN only)' })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INDIVIDUAL, UserRole.COMPANY)
  @ApiOperation({ summary: 'Delete a comment (OWNER or ADMIN)' })
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.commentService.remove(id, userId, userRole);
  }
}