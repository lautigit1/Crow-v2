import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { CategorySchema } from './categories.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard, Roles } from '../common/guards/roles.guard.js';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  @ApiOkResponse({ description: 'List categories' })
  list() { return this.categories.list(); }

  @Get(':id')
  @ApiOkResponse({ description: 'Get category by id' })
  get(@Param('id') id: string) { return this.categories.get(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'Category created' })
  create(@Req() req: { headers: Record<string,string> }, @Body() body: unknown) {
    const parsed = CategorySchema.parse(body);
    const token = (req.headers['authorization'] ?? '').replace('Bearer ', '');
    return this.categories.create(parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ description: 'Category updated' })
  update(@Req() req: { headers: Record<string,string> }, @Param('id') id: string, @Body() body: unknown) {
    const parsed = CategorySchema.parse(body);
    const token = (req.headers['authorization'] ?? '').replace('Bearer ', '');
    return this.categories.update(id, parsed, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Category removed' })
  remove(@Req() req: { headers: Record<string,string> }, @Param('id') id: string) {
    const token = (req.headers['authorization'] ?? '').replace('Bearer ', '');
    this.categories.remove(id, token);
    return;
  }
}
