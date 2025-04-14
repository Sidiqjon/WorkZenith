import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateCompanyDto) {
    try {
      const existing = await this.prisma.company.findFirst({ where: { ownerId: userId } });
      if (existing) {
        throw new ConflictException('Company already exists for this user');
      }

      const data = await this.prisma.company.create({
        data: {
          ...dto,
          ownerId: userId,
        },
      });

      return { message: 'Company created successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.company.fields;
    sortOrder?: 'asc' | 'desc';
    filter?: { [key: string]: any };
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        filter = {},
      } = query || {};

      const where: any = { ...filter };

      if (search) {
        where.OR = [
          { nameUz: { contains: search, mode: 'insensitive' } },
          { nameRu: { contains: search, mode: 'insensitive' } },
          { nameEn: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.company.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });

      const total = await this.prisma.company.count({ where });

      if (!data.length) throw new NotFoundException('No companies found!');

      return {
        message: 'Companies fetched successfully!',
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
        data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.company.findUnique({
        where: { id },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              phoneNumber: true,
              role: true,
            },
          },
        },
      });

      if (!data) throw new NotFoundException("Company not found with the provided 'id'");

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, userId: string, dto: UpdateCompanyDto) {
    try {
      const company = await this.prisma.company.findUnique({ where: { id } });

      if (!company) throw new NotFoundException("Company not found with the provided 'id'");
      if (company.ownerId !== userId) throw new ForbiddenException('Access denied');

      const data = await this.prisma.company.update({
        where: { id },
        data: dto,
      });

      return { message: 'Company updated successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string, userId: string) {
    try {
      const company = await this.prisma.company.findUnique({ where: { id } });

      if (!company) throw new NotFoundException("Company not found with the provided 'id'");
      if (company.ownerId !== userId) throw new ForbiddenException('Access denied');

      const data = await this.prisma.company.delete({ where: { id } });

      return { message: 'Company deleted successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) throw error;
    throw new BadRequestException(error.message);
  }
}
