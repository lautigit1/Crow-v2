import { CanActivate, ExecutionContext, Injectable, ForbiddenException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ user?: { role?: string; email?: string } }>();
    const role = request.user?.role ?? 'authenticated';
    
    console.log(`[ROLES] Required: ${roles.join(', ')} | User has: ${role} (${request.user?.email})`);
    
    if (!roles.includes(role)) throw new ForbiddenException('Insufficient role');
    return true;
  }
}
