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
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { UserRole } from '../guard/role-enum';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create an order (USER only)' })
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.orderService.create(dto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all orders with filters' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Number of items per page' })
  @ApiQuery({ name: 'search', required: false, example: '123 Main St', description: 'Search term for address or delivery comment' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createdAt', description: 'Field to sort by' })
  @ApiQuery({ name: 'sortOrder', required: false, example: 'asc', description: 'Sort order (asc or desc)' })
  @ApiQuery({ name: 'status', required: false, example: 'PENDING', description: 'Filter by order status' })
  findAll(
    @Req() req: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('status') status?: string,
  ) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.orderService.findAll(userId, userRole, {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      status,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a single order by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.orderService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Update order (ADMIN or SUPERADMIN only)' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete order (ADMIN only)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}