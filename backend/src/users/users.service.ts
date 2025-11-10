import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';
import { z } from 'zod';

const AddressSchema = z.object({
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  province: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2)
});
type AddressInput = z.infer<typeof AddressSchema>;

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getMe(userId: string, token: string) {
    // Get email from auth user and merge with profile data
    const { data: authUser, error: authErr } = await this.db.adminClient.auth.admin.getUserById(userId);
    if (authErr || !authUser.user) throw authErr ?? new NotFoundException('User not found');

    const { data: profile } = await this.db.adminClient
      .from('users_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return {
      id: userId,
      email: authUser.user.email,
      name: (profile as any)?.name ?? null,
      role: (profile as any)?.role ?? 'authenticated',
    };
  }

  async updateMe(userId: string, body: { name?: string }, token: string) {
    if (!body.name) return this.getMe(userId, token);
    // Use service role client to bypass RLS for updating user's own profile
    const { error } = await this.db.adminClient
      .from('users_profiles')
      .update({ name: body.name })
      .eq('id', userId)
      .select('*')
      .single();
    if (error) throw error;
    return this.getMe(userId, token);
  }

  async listAddresses(userId: string, token: string) {
    const client = this.db.forUser(token);
    const { data, error } = await client.from('addresses').select('*').eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  async addAddress(userId: string, body: AddressInput, token: string) {
    const client = this.db.forUser(token);
    const insert = { ...body, user_id: userId };
    const { data, error } = await client.from('addresses').insert(insert).select('*').single();
    if (error) throw error;
    return data;
  }

  async updateAddress(userId: string, id: string, body: Partial<AddressInput>, token: string) {
    const client = this.db.forUser(token);
    const { data, error } = await client
      .from('addresses')
      .update(body)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  }

  async removeAddress(userId: string, id: string, token: string) {
    const client = this.db.forUser(token);
    const { error } = await client.from('addresses').delete().eq('id', id).eq('user_id', userId);
    if (error) throw error;
    return { ok: true };
  }

  // ============ Admin operations ============
  async listUsers(token: string) {
    // Using admin client since listing all users is a privileged operation
    const { data, error } = await this.db.adminClient.auth.admin.listUsers();
    if (error) throw new BadRequestException(error.message);
  return data.users.map(u => ({ id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? 'authenticated', name: (u.user_metadata as any)?.name, createdAt: (u as any).created_at }));
  }

  async getUserById(id: string, token: string) {
    const { data, error } = await this.db.adminClient.auth.admin.getUserById(id);
    if (error || !data.user) throw new NotFoundException('User not found');
    const u = data.user;
  return { id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? 'authenticated', name: (u.user_metadata as any)?.name, createdAt: (u as any).created_at };
  }

  async updateUserRole(id: string, role: string, token: string) {
    const { data, error } = await this.db.adminClient.auth.admin.updateUserById(id, { app_metadata: { role } });
    if (error || !data.user) throw new BadRequestException(error?.message ?? 'Cannot update role');
    const u = data.user;
  return { id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? role, name: (u.user_metadata as any)?.name, createdAt: (u as any).created_at };
  }

  async disableUser(id: string, token: string) {
    // Soft disable: set metadata flag; Supabase does not have direct disable field, you can enforce in RLS or app logic.
    const { data, error } = await this.db.adminClient.auth.admin.updateUserById(id, { user_metadata: { disabled: true } });
    if (error || !data.user) throw new BadRequestException(error?.message ?? 'Cannot disable user');
    return { ok: true };
  }

  /**
   * Bulk delete test users. Test users are identified by email or name containing any of the provided patterns
   * (case-insensitive). Defaults include common placeholders (test, demo, dummy, example, prueba).
   * Returns list of deleted user IDs.
   */
  async purgeTestUsers(patterns?: string[]) {
    const usedPatterns = (patterns && patterns.length > 0 ? patterns : ['test','demo','dummy','example','prueba'])
      .map(p => p.toLowerCase());
    const { data, error } = await this.db.adminClient.auth.admin.listUsers();
    if (error) throw new BadRequestException(error.message);
    const candidates = data.users.filter(u => {
      const email = (u.email ?? '').toLowerCase();
      const name = ((u.user_metadata as any)?.name ?? '').toLowerCase();
      return usedPatterns.some(p => email.includes(p) || name.includes(p));
    });
    const deleted: string[] = [];
    for (const u of candidates) {
      try {
        const { error: delErr } = await this.db.adminClient.auth.admin.deleteUser(u.id);
        if (!delErr) deleted.push(u.id);
      } catch {}
    }
    return { deleted, total: deleted.length };
  }

  /**
   * Promote users whose email or name contains any of the identifiers (case-insensitive) to admin role.
   * Returns list of promoted user IDs.
   */
  async promoteMatchingUsers(identifiers: string[]) {
    if (!identifiers || identifiers.length === 0) throw new BadRequestException('No identifiers provided');
    const lowers = identifiers.map(i => i.toLowerCase());
    const { data, error } = await this.db.adminClient.auth.admin.listUsers();
    if (error) throw new BadRequestException(error.message);
    const matches = data.users.filter(u => {
      const email = (u.email ?? '').toLowerCase();
      const name = ((u.user_metadata as any)?.name ?? '').toLowerCase();
      return lowers.some(id => email.includes(id) || name.includes(id));
    });
    const promoted: string[] = [];
    for (const u of matches) {
      const currentRole = (u.app_metadata as any)?.role ?? 'authenticated';
      if (currentRole === 'admin') continue; // already admin
      const { error: upErr, data: upData } = await this.db.adminClient.auth.admin.updateUserById(u.id, { app_metadata: { role: 'admin' } });
      if (!upErr && upData?.user) promoted.push(u.id);
    }
    return { promoted, total: promoted.length };
  }

  /**
   * Aggregate statistics for admin dashboard.
   */
  async getAdminStats() {
    const { data, error } = await this.db.adminClient.auth.admin.listUsers();
    if (error) throw new BadRequestException(error.message);
    const allUsers = data.users;
    const totalUsers = allUsers.length;
    const totalAdmins = allUsers.filter(u => (u.app_metadata as any)?.role === 'admin').length;
    // Products count
    const { count: productsCount, error: prodErr } = await this.db.adminClient
      .from('products')
      .select('id', { count: 'exact', head: true });
    if (prodErr) throw prodErr;
    // Orders count
    const { count: ordersCount, error: ordersErr } = await this.db.adminClient
      .from('orders')
      .select('id', { count: 'exact', head: true });
    if (ordersErr) throw ordersErr;
    // Profiles count
    const { count: profilesCount, error: profilesErr } = await this.db.adminClient
      .from('users_profiles')
      .select('id', { count: 'exact', head: true });
    if (profilesErr) throw profilesErr;
    return {
      totalUsers,
      totalAdmins,
      totalProducts: productsCount ?? 0,
      totalOrders: ordersCount ?? 0,
      totalProfiles: profilesCount ?? 0,
    };
  }
}
