import { INestApplication, CanActivate, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from '../../src/common/pipes/zod-validation.pipe.js';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter.js';
import { ProductsService } from '../../src/products/products.service.js';
import { UsersService } from '../../src/users/users.service.js';
import { OrdersService } from '../../src/orders/orders.service.js';
import { AuthService } from '../../src/auth/auth.service.js';
import { DatabaseService } from '../../src/core/database.service.js';
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../src/common/guards/roles.guard.js';

class AllowAllJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    req.user = { userId: 'user-1', role: 'admin' };
    return true;
  }
}

class AllowAllRolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return true;
  }
}

describe('Crow API (e2e with fakes)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (k: string) => {
          switch (k) {
            case 'ACCESS_TOKEN_TTL':
              return '900s';
            case 'REFRESH_TOKEN_TTL':
              return '7d';
            case 'CORS_ORIGIN':
              return 'http://localhost:3000';
            default:
              return undefined;
          }
        },
        getOrThrow: (k: string) => {
          switch (k) {
            case 'JWT_ACCESS_SECRET':
              return 'test-access-secret';
            case 'JWT_REFRESH_SECRET':
              return 'test-refresh-secret';
            default:
              throw new Error(`Missing ${k}`);
          }
        },
      })
      .overrideProvider(DatabaseService)
      .useValue({
        adminClient: {},
        anonClient: {},
        forUser: (_t: string) => ({}),
      })
  .overrideGuard(JwtAuthGuard)
  .useValue(new AllowAllJwtGuard())
  .overrideGuard(RolesGuard)
  .useValue(new AllowAllRolesGuard())
  .overrideProvider(ProductsService)
      .useValue({
        list: (q?: string) => Promise.resolve([{ id: 'p1', name: 'Filtro', price: 1000, stock: 5, sku: 'SKU1' }]),
        get: (id: string) => Promise.resolve({ id, name: 'Filtro', price: 1000, stock: 5, sku: 'SKU1' }),
        create: (body: any) => Promise.resolve({ id: 'p2', ...body }),
        update: (id: string, body: any) => Promise.resolve({ id, ...body }),
        remove: (id: string) => Promise.resolve({ ok: true }),
      })
      .overrideProvider(UsersService)
      .useValue({
        getMe: () => Promise.resolve({ id: 'user-1', email: 'test@example.com', name: 'Tester' }),
        listAddresses: () => Promise.resolve([]),
        addAddress: (_uid: string, body: any) => Promise.resolve({ id: 'addr-1', ...body }),
        updateAddress: (_uid: string, id: string, body: any) => Promise.resolve({ id, ...body }),
        removeAddress: () => Promise.resolve({ ok: true }),
      })
      .overrideProvider(OrdersService)
      .useValue({ create: () => Promise.resolve({ orderId: 'order-1' }), list: () => Promise.resolve([]) })
      .overrideProvider(AuthService)
      .useValue({
        register: () => Promise.resolve({ accessToken: 'a', refreshToken: 'r' }),
        login: () => Promise.resolve({ accessToken: 'a', refreshToken: 'r' }),
        refresh: () => Promise.resolve({ accessToken: 'a2', refreshToken: 'r2' }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/products', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Filtro');
  });

  it('POST /api/v1/products (admin)', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/products')
      .send({ name: 'Aceite', price: 2000, stock: 3, sku: 'SKU2' })
      .expect(201);
  });

  it('GET /api/v1/users/me', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/users/me').expect(200);
    expect(res.body.email).toBe('test@example.com');
  });

  it('POST /api/v1/orders', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/orders')
      .send({ items: [{ productId: '11111111-1111-1111-1111-111111111111', qty: 1 }] })
      .expect(201);
  });

  it('POST /api/v1/auth/login', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'e@example.com', password: 'p-12345678' })
      .expect(201);
    expect(res.body.accessToken).toBeDefined();
  });
});
