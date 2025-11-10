import { z } from 'zod';

export const ProductBaseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  sku: z.string().min(1),
});

export const CreateProductSchema = ProductBaseSchema;
export class CreateProductDto { static zodSchema = CreateProductSchema; }
export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = ProductBaseSchema.partial();
export class UpdateProductDto { static zodSchema = UpdateProductSchema; }
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
