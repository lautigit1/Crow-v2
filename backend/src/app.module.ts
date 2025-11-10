import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { ErrorTrackingService } from './common/services/error-tracking.service.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
  // Simplified throttler config (Nest Throttler v5 expects array of throttlers)
  ThrottlerModule.forRoot([{ ttl: 60, limit: 100 }]),
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
  providers: [
    ErrorTrackingService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    HttpExceptionFilter,
    LoggingInterceptor,
  ],
})
export class AppModule {}
