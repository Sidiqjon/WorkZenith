import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SiteMetadataService } from './sitemetadata.service';
import { CreateSiteMetadataDto } from './dto/create-sitemetadata.dto';
import { UpdateSiteMetadataDto } from './dto/update-sitemetadata.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SiteMetadata')
@Controller('site-metadata')
export class SiteMetadataController {
  constructor(private readonly siteMetadataService: SiteMetadataService) {}

  @Post()
  create(@Body() createSiteMetadataDto: CreateSiteMetadataDto) {
    return this.siteMetadataService.create(createSiteMetadataDto);
  }

  @Get()
  findAll() {
    return this.siteMetadataService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSiteMetadataDto: UpdateSiteMetadataDto,
  ) {
    return this.siteMetadataService.update(id, updateSiteMetadataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteMetadataService.remove(id);
  }
}
