import { Injectable, Logger } from '@nestjs/common';

interface ErrorContext {
  path?: string;
  method?: string;
  status?: number;
  [key: string]: unknown;
}

@Injectable()
export class ErrorTrackingService {
  capture(err: unknown, context: ErrorContext = {}) {
    // Placeholder – integrate Sentry/Winston here later
    const base = err instanceof Error ? { message: err.message, stack: err.stack?.split('\n').slice(0, 5) } : { message: String(err) };
    Logger.warn(`[ErrorTracking] ${base.message} :: ${JSON.stringify({ ...context })}`);
  }
}
