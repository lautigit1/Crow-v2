import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  parentId: z.string().uuid().optional(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
