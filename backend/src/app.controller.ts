import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  root() {
    return { ok: true, name: 'Crow API', docs: '/api/docs', health: '/api/v1/health' };
  }

  @Get('api/v1/health')
  health() {
    return { status: 'ok', ts: Date.now() };
  }
}