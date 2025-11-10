import { Controller, Get, UseGuards, Req, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiNoContentResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { UsersService } from './users.service.js';
import { z } from 'zod';
import { RolesGuard, Roles } from '../common/guards/roles.guard.js';

const AddressSchema = z.object({
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2)
});

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @ApiOkResponse({ description: 'Current user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  me(@Req() req: { user: { userId: string }; headers: Record<string,string> }) {
    return this.users.getMe(req.user.userId, this.extractToken(req.headers));
  }

  @Patch('me')
  @ApiOkResponse({ description: 'Updated current user profile' })
  updateMe(
    @Req() req: { user: { userId: string }; headers: Record<string,string> },
    @Body() body: { name?: string }
  ) {
    const parsed = z.object({ name: z.string().min(1).optional() }).parse(body);
    return this.users.updateMe(req.user.userId, parsed, this.extractToken(req.headers));
  }

  @Get('me/addresses')
  @ApiOkResponse({ description: 'List addresses' })
  listAddresses(@Req() req: { user: { userId: string }; headers: Record<string,string> }) {
    return this.users.listAddresses(req.user.userId, this.extractToken(req.headers));
  }

  @Post('me/addresses')
  @ApiOkResponse({ description: 'Address created' })
  addAddress(@Req() req: { user: { userId: string }; headers: Record<string,string> }, @Body() body: z.infer<typeof AddressSchema>) {
    const parsed = AddressSchema.parse(body);
    return this.users.addAddress(req.user.userId, parsed, this.extractToken(req.headers));
  }

  @Patch('me/addresses/:id')
  @ApiOkResponse({ description: 'Address updated' })
  updateAddress(
    @Req() req: { user: { userId: string }; headers: Record<string,string> },
    @Param('id') id: string,
    @Body() body: Partial<z.infer<typeof AddressSchema>>
  ) {
    const parsed = AddressSchema.partial().parse(body);
    return this.users.updateAddress(req.user.userId, id, parsed, this.extractToken(req.headers));
  }

  @Delete('me/addresses/:id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Address removed' })
  removeAddress(@Req() req: { user: { userId: string }; headers: Record<string,string> }, @Param('id') id: string) {
    this.users.removeAddress(req.user.userId, id, this.extractToken(req.headers));
    return;
  }

  // ===== Admin endpoints =====
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'List all users (admin)' })
  @ApiForbiddenResponse({ description: 'Requires admin role' })
  listUsers(@Req() req: { headers: Record<string,string> }) {
    return this.users.listUsers(this.extractToken(req.headers));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Get user by id (admin)' })
  getUser(@Param('id') id: string, @Req() req: { headers: Record<string,string> }) {
    return this.users.getUserById(id, this.extractToken(req.headers));
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Updated user role (admin)' })
  updateRole(
    @Param('id') id: string,
    @Body() body: { role: string },
    @Req() req: { headers: Record<string,string> }
  ) {
    const parsed = z.object({ role: z.enum(['authenticated','admin']) }).parse(body);
    return this.users.updateUserRole(id, parsed.role, this.extractToken(req.headers));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User disabled (admin)' })
  disableUser(@Param('id') id: string, @Req() req: { headers: Record<string,string> }) {
    this.users.disableUser(id, this.extractToken(req.headers));
    return;
  }

  @Post('purge-test-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Deleted test users' })
  purgeTestUsers(
    @Body() body: { patterns?: string[] },
  ) {
    return this.users.purgeTestUsers(body?.patterns);
  }

  @Post('promote')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Promoted matching users to admin' })
  promoteMatching(
    @Body() body: { identifiers: string[] }
  ) {
    const parsed = z.object({ identifiers: z.array(z.string().min(1)).min(1) }).parse(body);
    return this.users.promoteMatchingUsers(parsed.identifiers);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ description: 'Admin stats' })
  getStats() {
    return this.users.getAdminStats();
  }

  private extractToken(headers: Record<string,string>): string {
    const raw = headers['authorization'] ?? '';
    return raw.replace('Bearer ', '');
  }
}
