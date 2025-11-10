import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module.js';
import { ZodValidationPipe } from '../../src/common/pipes/zod-validation.pipe.js';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter.js';
import { ensureProduct, cleanupProduct } from './utils/seed.js';

const REAL = process.env.E2E_REAL === 'true';

(REAL ? describe : describe.skip)('Crow API (e2e real Supabase)', () => {
  let app: INestApplication;
  const testSku = 'E2E-SKU-1';
  const email = `e2e_${Date.now()}@example.com`;
  const password = 'p-12345678';
  let accessToken = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api/v1');
    await app.init();

    // Ensure at least one product exists for ordering
    await ensureProduct(app, testSku);
  });

  afterAll(async () => {
    await cleanupProduct(app, testSku);
    await app.close();
  });

  it('POST /api/v1/auth/register', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email, password })
      .expect(201);
    expect(res.body.accessToken).toBeDefined();
    accessToken = res.body.accessToken;
  });

  it('GET /api/v1/products', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/v1/users/me', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(res.body.email).toBe(email);
  });

  it('POST /api/v1/orders', async () => {
    // look up the seeded product id by SKU
    const listRes = await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    const product = listRes.body.find((p: any) => p.sku === testSku) ?? listRes.body[0];
    expect(product?.id).toBeDefined();
    await request(app.getHttpServer())
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ items: [{ productId: product.id, qty: 1 }] })
      .expect(201);
  });
});
