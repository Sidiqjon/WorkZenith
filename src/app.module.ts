import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
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
import { PartnerModule } from './partner/partner.module';
import { SitemetadataModule } from './sitemetadata/sitemetadata.module';
// import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { ToolModule } from './tool/tool.module';
import { ProfessionModule } from './profession/profession.module';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, RegionModule, AuthModule, UploadModule, BrandModule, SizeModule, PowerModule, LevelModule, FaqModule, ShowcaseModule, PartnerModule, SitemetadataModule, AdminModule, UserModule, ContactModule, ToolModule, ProfessionModule, MasterModule, OrderModule],
  controllers: [],
  providers: [EskizService],
})
export class AppModule {}
