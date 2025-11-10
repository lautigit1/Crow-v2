import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { WishlistService } from './wishlist.service.js';
import { z } from 'zod';

const AddItemSchema = z.object({
  productId: z.string().uuid(),
});

@UseGuards(JwtAuthGuard)
@ApiTags('wishlist')
@ApiBearerAuth()
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  @Get()
  @ApiOkResponse({ description: 'Get wishlist items' })
  getWishlist(@Req() req: { user: { userId: string } }) {
    return this.wishlist.getItems(req.user.userId);
  }

  @Post('items')
  @ApiOkResponse({ description: 'Add item to wishlist' })
  addItem(@Req() req: { user: { userId: string } }, @Body() body: z.infer<typeof AddItemSchema>) {
    const parsed = AddItemSchema.parse(body);
    return this.wishlist.addItem(req.user.userId, parsed.productId);
  }

  @Delete('items/:productId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Remove item from wishlist' })
  removeItem(@Req() req: { user: { userId: string } }, @Param('productId') productId: string) {
    this.wishlist.removeItem(req.user.userId, productId);
    return;
  }

  @Delete()
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Clear wishlist' })
  clearWishlist(@Req() req: { user: { userId: string } }) {
    this.wishlist.clearWishlist(req.user.userId);
    return;
  }
}
