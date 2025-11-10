import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, Injectable } from '@nestjs/common';
import { ErrorTrackingService } from '../services/error-tracking.service.js';

@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly tracker: ErrorTrackingService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request & { id?: string }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: { message: string; [key: string]: unknown } = { message: 'Internal server error' };
    let debug: { error?: string; stack?: string } = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        body = { message: res };
      } else if (res && typeof res === 'object') {
        const maybe = res as Record<string, unknown>;
        body = { message: (maybe.message as string) || 'Error', ...maybe };
      }
    } else if (exception instanceof Error) {
      body = { message: exception.message };
      debug = { error: exception.message, stack: exception.stack?.toString().slice(0, 2000) };
    }

    Logger.error(`[${request.method}] ${request.url} -> ${status} ${body.message}`);
    try {
      this.tracker?.capture?.(exception, { path: request.url, method: (request as any)?.method, status });
    } catch {}

    response.status(status).json({
      statusCode: status,
      path: request.url,
      ...body,
      ...(process.env.NODE_ENV !== 'production' ? { debug } : {}),
      timestamp: new Date().toISOString(),
    });
  }
}
