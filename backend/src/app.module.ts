import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.schema.js';
import { CoreModule } from './core/core.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { BrandsModule } from './brands/brands.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { CartModule } from './cart/cart.module.js';
import { WishlistModule } from './wishlist/wishlist.module.js';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    CoreModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    BrandsModule,
    CategoriesModule,
    CartModule,
    WishlistModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
