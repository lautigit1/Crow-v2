import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { BrandsService } from './brands.service.js';
import { BrandSchema } from './brands.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard, Roles } from '../common/guards/roles.guard.js';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brands: BrandsService) {}

  @Get()
  @ApiOkResponse({ description: 'List brands' })
  list() { return this.brands.list(); }

  @Get(':id')
  @ApiOkResponse({ description: 'Get brand by id' })
  get(@Param('id') id: string) { return this.brands.get(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'Brand created' })
  create(@Req() req: { headers: Record<string,string> }, @Body() body: unknown) {
    const parsed = BrandSchema.parse(body);
    const token = this.extract(req.headers);
    return this.brands.create(parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ description: 'Brand updated' })
  update(@Req() req: { headers: Record<string,string> }, @Param('id') id: string, @Body() body: unknown) {
    const parsed = BrandSchema.parse(body);
    const token = this.extract(req.headers);
    return this.brands.update(id, parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Brand removed' })
  remove(@Req() req: { headers: Record<string,string> }, @Param('id') id: string) {
    const token = this.extract(req.headers);
    this.brands.remove(id, token);
    return;
  }

  private extract(headers: Record<string,string>) { return (headers['authorization'] ?? '').replace('Bearer ', ''); }
}
