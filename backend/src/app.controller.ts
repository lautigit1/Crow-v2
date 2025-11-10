import { Controller, Get } from '@nestjs/common';

// NOTE: Global prefix 'api/v1' is applied in main.ts, so routes here MUST be declared without it
@Controller()
export class AppController {
  @Get('/')
  root() {
    return { ok: true, name: 'Crow API', docs: '/api/docs', health: '/api/v1/health' };
  }

  @Get('health')
  health() {
    return { status: 'ok', ts: Date.now() };
  }
}