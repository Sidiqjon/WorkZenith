import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Prisma } from '@prisma/client';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMasterDto) {
    try {
      const { masterProfessions, ...body } = dto;

      const exists = await this.prisma.master.findFirst({
        where: { phoneNumber: body.phoneNumber },
      });
      if (exists) {
        throw new ConflictException('Master with this phone number already exists.');
      }

      // Validate masterProfessions
      if (masterProfessions?.length) {
        let professionIds = masterProfessions.map(mp => mp.professionId);

        const validProfessions = await this.prisma.profession.findMany({
          where: { id: { in: professionIds } },
        });
        
        if (validProfessions.length !== professionIds.length) {
          throw new BadRequestException('One or more profession IDs are invalid.');
        }

        let levelIds = masterProfessions
          .filter(mp => mp.levelId)
          .map(mp => mp.levelId)
          .filter(id => id !== undefined) as string[];

        levelIds = Array.from(new Set(levelIds));
        if (levelIds.length) {
          const validLevels = await this.prisma.level.findMany({
            where: { id: { in: levelIds } },
          });
          if (validLevels.length !== levelIds.length) {
            throw new BadRequestException('One or more level IDs are invalid.');
          }
        }
      }

      // Create Master record
      const master = await this.prisma.master.create({ data: body });

      // Create related MasterProfession records
      if (masterProfessions?.length) {
        const masterProfessionData = masterProfessions.map(mp => ({
          masterId: master.id,
          ...mp,
        }));
        await this.prisma.masterProfession.createMany({ data: masterProfessionData });
      }

      return { message: 'Master created successfully!', data: master };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    isActive?: boolean;
  }) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isActive,
      } = params;

      const where: any = {};
      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { phoneNumber: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (typeof isActive === 'boolean') {
        where.isActive = isActive;
      }

      const [data, total] = await this.prisma.$transaction([
        this.prisma.master.findMany({
          where,
          include: { masterProfessions: true },
          orderBy: { [sortBy]: sortOrder },
          skip: (page - 1) * limit,
          take: +limit,
        }),
        this.prisma.master.count({ where }),
      ]);

      if (!data.length) {
        throw new NotFoundException('Masters not found.');
      }

      return {
          total,
          currentPage: +page,
          totalPages: Math.ceil(total / +limit),
          data,
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const master = await this.prisma.master.findUnique({
        where: { id },
        include: { masterProfessions: true },
      });
      if (!master) {
        throw new NotFoundException('Master not found with the provided ID.');
      }
      return master;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, dto: UpdateMasterDto) {
    try {
      const existing = await this.prisma.master.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Master not found with the provided ID.');
      }

      const { img, passportImg, masterProfessions, ...body } = dto;

      if (img && existing.img && img !== existing.img) {
        await this.removeImage(existing.img);
      }
      if (passportImg && existing.passportImg && passportImg !== existing.passportImg) {
        await this.removeImage(existing.passportImg);
      }

      // Validate masterProfessions
      if (masterProfessions?.length) {
        let professionIds = masterProfessions.map(mp => mp.professionId).filter(id => id !== undefined);

        const validProfessions = await this.prisma.profession.findMany({
          where: { id: { in: professionIds } },
        });
        if (validProfessions.length !== professionIds.length) {
          throw new BadRequestException('One or more profession IDs are invalid.');
        }

        let levelIds = masterProfessions
          .filter(mp => mp.levelId)
          .map(mp => mp.levelId)
          .filter(id => id !== undefined);

        levelIds = Array.from(new Set(levelIds));

        if (levelIds.length) {
          const validLevels = await this.prisma.level.findMany({
            where: { id: { in: levelIds } },
          });
          if (validLevels.length !== levelIds.length) {
            throw new BadRequestException('One or more level IDs are invalid.');
          }
        }

        // Delete old masterProfessions and create new ones
        let deleted = await this.prisma.masterProfession.deleteMany({ where: { masterId: id } });
        const masterProfessionData = masterProfessions.map(mp => ({
          masterId: id,
          professionId: mp.professionId, 
          minWorkingHours: mp.minWorkingHours, 
          levelId: mp.levelId, 
          priceHourly: mp.priceHourly ?? 40000,
          priceDaily: mp.priceDaily ?? 400000, 
          experience: mp.experience ?? 2.5,
        }));
        await this.prisma.masterProfession.createMany({ data: masterProfessionData });
      }

      // Update the master record
      const updated = await this.prisma.master.update({
        where: { id },
        data: {
          ...body,
          img: img ?? existing.img,
          passportImg: passportImg ?? existing.passportImg,
        },
      });

      return { message: 'Master updated successfully', data: updated };
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.master.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Master not found.');
      }

      if (existing.img) {
        await this.removeImage(existing.img);
      }
      if (existing.passportImg) {
        await this.removeImage(existing.passportImg);
      }

      const data = await this.prisma.master.delete({ where: { id } });
      if (!data) {
        throw new BadRequestException('Failed to delete master.');
      }

      return { message: 'Master deleted successfully', data };
    } catch (error) {
      this.handleError(error);
    }
  }

  private async removeImage(imgPath: string) {
    try {
      const filePath = path.join('uploads', imgPath);
      await fs.unlink(filePath);
    } catch (err) {
    }
  }

  private handleError(error: any) {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException ||
      error instanceof ConflictException
    ) {
      throw error;
    }
    console.error(error);
    throw new InternalServerErrorException('Internal server error');
  }
}