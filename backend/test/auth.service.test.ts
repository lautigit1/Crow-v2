import { AuthService } from '../src/auth/auth.service.js';
import { JwtService } from '@nestjs/jwt';

describe('AuthService (unit)', () => {
  const payload = { sub: 'user-123', email: 'test@example.com', role: 'authenticated' } as const;

  const mockConfig = {
    get: (key: string) => {
      switch (key) {
        case 'ACCESS_TOKEN_TTL':
          return '900s';
        case 'REFRESH_TOKEN_TTL':
          return '7d';
        default:
          return undefined;
      }
    },
    getOrThrow: (key: string) => {
      switch (key) {
        case 'JWT_REFRESH_SECRET':
          return 'refresh-secret';
        default:
          throw new Error(`Missing config ${key}`);
      }
    },
  } as any;

  const mockDb = {} as any; // Not used in refresh path

  it('issues tokens from a valid refresh token', async () => {
    const jwt = new JwtService({ secret: 'access-secret' });
    const service = new AuthService(jwt, mockConfig, mockDb);

    const refreshToken = await jwt.signAsync(payload, {
      secret: 'refresh-secret',
      expiresIn: '7d',
    });

    const res = await service.refresh(refreshToken);
    expect(typeof res.accessToken).toBe('string');
    expect(typeof res.refreshToken).toBe('string');
    expect(res.accessToken.length).toBeGreaterThan(20);
    expect(res.refreshToken.length).toBeGreaterThan(20);
  });
});
