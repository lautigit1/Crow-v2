import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, { metatype }: ArgumentMetadata) {
  // Access optional static zodSchema without widening entire metatype to any
  const schema: ZodSchema | undefined = (metatype as { zodSchema?: ZodSchema } | undefined)?.zodSchema;
    if (!schema) return value;
    const result = schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: result.error.flatten(),
      });
    }
    return result.data;
  }
}
