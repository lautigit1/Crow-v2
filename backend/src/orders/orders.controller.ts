import { Controller, Post, Body, Get, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { z } from 'zod';

@UseGuards(JwtAuthGuard)
@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  private static CreateOrderSchema = z.object({ items: z.array(z.object({ productId: z.string().uuid(), qty: z.number().int().positive() })) });

  @Post()
  @ApiCreatedResponse({ description: 'Order created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Req() req: { user: { userId: string }; headers: Record<string, string> },
    @Body() body: z.infer<typeof OrdersController.CreateOrderSchema>
  ) {
    const parsed = OrdersController.CreateOrderSchema.parse(body);
    return this.orders.create(req.user.userId, parsed.items, this.extractToken(req.headers));
  }

  @Get()
  @ApiOkResponse({ description: 'List orders for current user' })
  list(@Req() req: { user: { userId: string }; headers: Record<string, string> }) {
    return this.orders.list(req.user.userId, this.extractToken(req.headers));
  }

  private extractToken(headers: Record<string, string>): string {
    const header = headers['authorization'] ?? '';
    return header.replace('Bearer ', '');
  }
}
