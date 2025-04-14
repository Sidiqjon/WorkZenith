import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { EskizService } from './eskiz/eskiz.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { PowerModule } from './power/power.module';
import { LevelModule } from './level/level.module';
import { FaqModule } from './faq/faq.module';
import { ShowcaseModule } from './showcase/showcase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, RegionModule, AuthModule, UploadModule, BrandModule, SizeModule, PowerModule, LevelModule, FaqModule, ShowcaseModule],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
