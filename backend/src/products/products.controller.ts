import { Controller, Get, Param, Query, Post, Body, Patch, Delete, UseGuards, HttpCode } from '@nestjs/common';
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
  create(@Body() body: CreateProductInput) {
    const parsed = CreateProductSchema.parse(body);
    return this.products.create(parsed);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Product updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden: insufficient role' })
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductInput) {
    const parsed = UpdateProductSchema.parse(body);
    return this.products.update(id, parsed);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Product removed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden: insufficient role' })
  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.products.remove(id);
    return;
  }
}
