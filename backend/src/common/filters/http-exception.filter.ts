import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request & { id?: string }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
  let body: { message: string; [key: string]: unknown } = { message: 'Internal server error' };

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
    }

    Logger.error(`[${request.method}] ${request.url} -> ${status} ${body.message}`);

    response.status(status).json({
      statusCode: status,
      path: request.url,
      ...body,
      timestamp: new Date().toISOString(),
    });
  }
}
