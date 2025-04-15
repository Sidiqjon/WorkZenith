import {
  Injectable, BadRequestException, ConflictException,
  HttpException, NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProfessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfessionDto) {
    try {
      const existing = await this.prisma.profession.findFirst({
        where: { nameUz: dto.nameUz },
      });

      if (existing) {
        throw new ConflictException('Profession with this name already exists!');
      }

      const data = await this.prisma.profession.create({ data: dto });

      return { message: 'Profession created successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.profession.fields;
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

      const data = await this.prisma.profession.findMany({
        where,
        include: {
          masterProfessions: true,
          professionLevels: true,
          professionTools: true,
          orderProducts: true,
          basket: true
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.profession.count({ where });

      if (!data.length) throw new NotFoundException('No professions found!');

      return {
        message: 'Professions fetched successfully!',
        meta: { total, page, lastPage: Math.ceil(total / limit) },
        data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.profession.findUnique({ 
        where: { id },
        include: {
          masterProfessions: true,
          professionLevels: true,
          professionTools: true,
          orderProducts: true,
          basket: true
        }
      });

      if (!data) throw new NotFoundException("Profession not found with the provided 'id'!");

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateProfessionDto) {
    try {
      const profession = await this.prisma.profession.findUnique({ where: { id } });
      if (!profession) throw new NotFoundException("Profession not found with the provided 'id'!");

      if (dto.nameUz) {
        const existing = await this.prisma.profession.findFirst({
          where: { nameUz: dto.nameUz, NOT: { id } },
        });
        if (existing) throw new ConflictException('Profession with this name already exists!');
      }

      if (dto.img && dto.img !== profession.img) {
        const oldImgPath = path.join('uploads', profession.img);
        if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);
      }

      const data = await this.prisma.profession.update({
        where: { id },
        data: dto,
      });

      return { message: 'Profession updated successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const profession = await this.prisma.profession.findUnique({ where: { id } });

      if (!profession) throw new NotFoundException("Profession not found with the provided 'id'!");

      const oldImgPath = path.join('uploads', profession.img);
      if (fs.existsSync(oldImgPath)) fs.unlinkSync(oldImgPath);

      const data = await this.prisma.profession.delete({ where: { id } });

      return { message: 'Profession deleted successfully!', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) throw error;
    throw new BadRequestException(error.message);
  }
}
