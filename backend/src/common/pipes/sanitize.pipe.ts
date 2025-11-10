import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

function sanitize(value: unknown): unknown {
  if (typeof value === 'string') {
    // Trim and remove control characters
    return value.trim().replace(/[\u0000-\u001F\u007F]/g, '');
  }
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = sanitize(v);
    return out;
  }
  return value;
}

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown, _meta: ArgumentMetadata) {
    return sanitize(value);
  }
}
