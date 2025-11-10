import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest() as any;
    const start = Date.now();
    const method = req?.method;
    const url = req?.originalUrl || req?.url;
    const userId = req?.user?.userId || 'anon';

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          Logger.log(`[${method}] ${url} (${userId}) -> ${ms}ms`, 'HTTP');
        },
        error: (err) => {
          const ms = Date.now() - start;
          Logger.warn(`[${method}] ${url} (${userId}) ERROR after ${ms}ms: ${err?.message || err}`);
        },
      })
    );
  }
}
