import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CartService } from './cart.service.js';
import { z } from 'zod';

const AddItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
  variantId: z.string().uuid().optional(),
});

const UpdateQuantitySchema = z.object({
  quantity: z.number().int().min(0),
  variantId: z.string().uuid().optional(),
});

@UseGuards(JwtAuthGuard)
@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  @ApiOkResponse({ description: 'Get cart items' })
  getCart(@Req() req: { user: { userId: string } }) {
    return this.cart.getCartItems(req.user.userId);
  }

  @Post('items')
  @ApiOkResponse({ description: 'Add item to cart' })
  addItem(@Req() req: { user: { userId: string } }, @Body() body: z.infer<typeof AddItemSchema>) {
    const parsed = AddItemSchema.parse(body);
    return this.cart.addItem(req.user.userId, parsed.productId, parsed.quantity, parsed.variantId);
  }

  @Patch('items/:productId')
  @ApiOkResponse({ description: 'Update item quantity' })
  updateQuantity(
    @Req() req: { user: { userId: string } },
    @Param('productId') productId: string,
    @Body() body: z.infer<typeof UpdateQuantitySchema>
  ) {
    const parsed = UpdateQuantitySchema.parse(body);
    return this.cart.updateQuantity(req.user.userId, productId, parsed.quantity, parsed.variantId);
  }

  @Delete('items/:productId')
  @HttpCode(204)
  removeItem(
    @Req() req: { user: { userId: string } },
    @Param('productId') productId: string,
    @Body() body?: { variantId?: string }
  ) {
    this.cart.removeItem(req.user.userId, productId, body?.variantId);
    return;
  }

  @Delete()
  @HttpCode(204)
  clearCart(@Req() req: { user: { userId: string } }) {
    this.cart.clearCart(req.user.userId);
    return;
  }
}
