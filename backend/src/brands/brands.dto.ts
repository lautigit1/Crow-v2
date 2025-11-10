import { z } from 'zod';

export const BrandSchema = z.object({
  name: z.string().min(2),
});

export type BrandInput = z.infer<typeof BrandSchema>;
