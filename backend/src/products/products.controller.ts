import { Controller, Get, Param, Query, Post, Body, Patch, Delete, UseGuards, HttpCode, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { Roles, RolesGuard } from '../common/guards/roles.guard.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CreateProductSchema, UpdateProductSchema } from './products.dto.js';
import type { CreateProductInput, UpdateProductInput } from './products.dto.js';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  @ApiOkResponse({ description: 'List products' })
  list(@Query('q') q?: string) {
    return this.products.list(q);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get product by id' })
  get(@Param('id') id: string) {
    return this.products.get(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Product created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden: insufficient role' })
  @Roles('admin')
  @Post()
  create(@Req() req: { headers: Record<string,string> }, @Body() body: CreateProductInput) {
    const parsed = CreateProductSchema.parse(body);
    const token = this.extractToken(req.headers);
    return this.products.create(parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Product updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden: insufficient role' })
  @Roles('admin')
  @Patch(':id')
  update(@Req() req: { headers: Record<string,string> }, @Param('id') id: string, @Body() body: UpdateProductInput) {
    const parsed = UpdateProductSchema.parse(body);
    const token = this.extractToken(req.headers);
    return this.products.update(id, parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Product removed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden: insufficient role' })
  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  remove(@Req() req: { headers: Record<string,string> }, @Param('id') id: string) {
    const token = this.extractToken(req.headers);
    this.products.remove(id, token);
    return;
  }

  private extractToken(headers: Record<string,string>): string {
    const raw = headers['authorization'] ?? '';
    return raw.replace('Bearer ', '');
  }
}
