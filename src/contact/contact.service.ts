import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto, userId: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found!');

      const data = await this.prisma.contact.create({
        data: { ...dto, userId },
      });

      return { message: 'Contact created successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query: {
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    [key: string]: any;
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        ...filters
      } = query;

      const where: any = { ...filters };

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { phoneNumber: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.contact.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        include: { user: { omit: { password: true, refreshToken: true } } },
        skip: (+page - 1) * +limit,
        take: +limit,
      });

      const total = await this.prisma.contact.count({ where });

      return {
        message: 'Contacts fetched successfully!',
        meta: {
          total,
          page: +page,
          lastPage: Math.ceil(total / +limit),
        },
        data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    try {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
        include: { user: { omit: { password: true, refreshToken: true } } },
      });

      if (!contact) throw new NotFoundException('Contact not found!');

      if ( contact.userId !== userId) {
        if ( ['ADMIN', 'SUPERADMIN', 'VIEWERADMIN'].includes(userRole) === false) throw new ForbiddenException('Access denied! You are not allowed to view this contact')
      }

      return { data: contact };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateContactDto) {
    try {
      const contact = await this.prisma.contact.findUnique({ where: { id } });
      if (!contact) throw new NotFoundException('Contact not found!');

      const updated = await this.prisma.contact.update({
        where: { id },
        data: dto,
      });

      return { message: 'Contact updated successfully!', data: updated };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const contact = await this.prisma.contact.findUnique({ where: { id } });
      if (!contact) throw new NotFoundException('Contact not found!');

      const deleted = await this.prisma.contact.delete({ where: { id } });

      return { message: 'Contact deleted successfully!', data: deleted };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) throw error;
    throw new BadRequestException(error.message);
  }
}
