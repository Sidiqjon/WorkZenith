import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPowerDto: CreatePowerDto) {
    try {
      const existing = await this.prisma.power.findFirst({
        where: { nameUz: createPowerDto.nameUz },
      });

      if (existing) {
        throw new ConflictException('Power with this name already exists!');
      }

      const data = await this.prisma.power.create({
        data: createPowerDto,
      });

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof typeof this.prisma.power.fields;
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

      const where: any = {
        ...filter,
      };

      if (search) {
        where.OR = [
          { nameUz: { contains: search, mode: 'insensitive' } },
          { nameRu: { contains: search, mode: 'insensitive' } },
          { nameEn: { contains: search, mode: 'insensitive' } },
        ];
      }

      const data = await this.prisma.power.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total = await this.prisma.power.count({ where });

      // if (!data.length) {
      //   throw new NotFoundException('No power records found!');
      // }

      return {
        // message: 'Power list fetched successfully!',
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
      const data = await this.prisma.power.findUnique({ where: { id } });

      if (!data) {
        throw new NotFoundException("Power not found with the provided 'id'!");
      }

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updatePowerDto: UpdatePowerDto) {
    try {
      const existing = await this.prisma.power.findUnique({ where: { id } });

      if (!existing) {
        throw new NotFoundException("Power not found with the provided 'id'!");
      }

      if (updatePowerDto.nameUz) {
        const duplicate = await this.prisma.power.findFirst({
          where: {
            nameUz: updatePowerDto.nameUz,
            NOT: { id },
          },
        });

        if (duplicate) {
          throw new ConflictException('Another power with this name already exists!');
        }
      }

      const data = await this.prisma.power.update({
        where: { id },
        data: updatePowerDto,
      });

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.power.findUnique({ where: { id } });

      if (!existing) {
        throw new NotFoundException("Power not found with the provided 'id'!");
      }

      const data = await this.prisma.power.delete({ where: { id } });

      return { data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new BadRequestException(error.message);
  }
}
