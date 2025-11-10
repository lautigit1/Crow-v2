import { CreateProductSchema, UpdateProductSchema } from '../src/products/products.dto.js';

describe('Product Zod Schemas', () => {
  it('validates a correct create product payload', () => {
    const payload = {
      name: 'Filtro de aceite',
      description: 'Filtro premium',
      price: 1999.99,
      stock: 10,
      sku: 'FILT-ACE-001',
    };
    const parsed = CreateProductSchema.parse(payload);
    expect(parsed).toEqual(payload);
  });

  it('rejects negative price', () => {
    expect(() => CreateProductSchema.parse({
      name: 'X', price: -5, stock: 1, sku: 'BAD-PRICE'
    })).toThrow();
  });

  it('allows partial update', () => {
    const partial = { price: 2500 };
    const parsed = UpdateProductSchema.parse(partial);
    expect(parsed).toEqual(partial);
  });
});
