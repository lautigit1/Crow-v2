import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../core/database.service.js';
import { LoginDto, RegisterDto, JwtPayload } from './dto.js';

@Injectable()
export class AuthService {
  private refreshSecret: string;
  private accessTtl: string;
  private refreshTtl: string;
  private rotationEnabled: boolean;
  private activeRefresh: Map<string, Set<string>> = new Map(); // userId -> set of valid jti

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly db: DatabaseService,
  ) {
    this.refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    this.accessTtl = this.config.get<string>('ACCESS_TOKEN_TTL') ?? '900s';
    this.refreshTtl = this.config.get<string>('REFRESH_TOKEN_TTL') ?? '7d';
    this.rotationEnabled = (this.config.get<string>('REFRESH_ROTATION_ENABLED') ?? 'false') === 'true';
  }

  async register(dto: RegisterDto) {
    const { data, error } = await this.db.adminClient.auth.admin.createUser({
      email: dto.email,
      password: dto.password,
      email_confirm: true,
      user_metadata: { name: dto.name },
      app_metadata: { role: 'authenticated' },
    });
    if (error || !data.user) throw new BadRequestException(error?.message ?? 'Cannot create user');
    const tokens = await this.issueTokens({ sub: data.user.id, email: data.user.email!, role: 'authenticated' });
    return { user: { id: data.user.id, email: data.user.email! }, ...tokens };
  }

  async validateUser(email: string, password: string) {
    const { data, error } = await this.db.anonClient.auth.signInWithPassword({ email, password });
    if (error || !data.user) throw new UnauthorizedException('Invalid credentials');
    return data.user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    
    // Obtener el rol de la tabla users, no de app_metadata
    const { data: userData, error: userError } = await this.db.adminClient
      .from('users')
      .select('role')
      .eq('user_id', user.id)
      .single();
    
    const role = userData?.role ?? 'authenticated';
    
    console.log(`[AUTH] User ${dto.email} logging in with role: ${role}`);
    
    return this.issueTokens({ sub: user.id, email: user.email!, role });
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload & { jti?: string }>(refreshToken, { secret: this.refreshSecret });
      if (this.rotationEnabled) {
        if (!payload.jti) throw new UnauthorizedException('Malformed refresh token');
        const set = this.activeRefresh.get(payload.sub);
        if (!set || !set.has(payload.jti)) throw new UnauthorizedException('Refresh token invalidated');
        // Invalidate old token jti
        set.delete(payload.jti);
      }

      // Obtener el rol actualizado de la base de datos
      const { data: userData } = await this.db.adminClient
        .from('users')
        .select('role')
        .eq('user_id', payload.sub)
        .single();
      
      const role = userData?.role ?? payload.role ?? 'authenticated';
      
      return this.issueTokens({ sub: payload.sub, email: payload.email, role });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async issueTokens(payload: JwtPayload) {
    const accessToken = await this.jwt.signAsync(payload, { expiresIn: this.accessTtl });
    const jti = randomUUID();
    const refreshToken = await this.jwt.signAsync({ ...payload, jti }, { secret: this.refreshSecret, expiresIn: this.refreshTtl });
    if (this.rotationEnabled) {
      const set = this.activeRefresh.get(payload.sub) ?? new Set<string>();
      set.add(jti);
      this.activeRefresh.set(payload.sub, set);
    }
    return { accessToken, refreshToken };
  }
}
