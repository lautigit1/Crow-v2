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
    // Use service role client to bypass RLS for reading user's own profile
    const { data, error } = await this.db.adminClient.from('users_profiles').select('*').eq('id', userId).single();
    if (error) throw error;
    return data;
  }

  async updateMe(userId: string, body: { name?: string }, token: string) {
    if (!body.name) return this.getMe(userId, token);
    // Use service role client to bypass RLS for updating user's own profile
    const { data, error } = await this.db.adminClient.from('users_profiles').update({ name: body.name }).eq('id', userId).select('*').single();
    if (error) throw error;
    return data;
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
    return data.users.map(u => ({ id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? 'authenticated', name: (u.user_metadata as any)?.name }));
  }

  async getUserById(id: string, token: string) {
    const { data, error } = await this.db.adminClient.auth.admin.getUserById(id);
    if (error || !data.user) throw new NotFoundException('User not found');
    const u = data.user;
    return { id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? 'authenticated', name: (u.user_metadata as any)?.name };
  }

  async updateUserRole(id: string, role: string, token: string) {
    const { data, error } = await this.db.adminClient.auth.admin.updateUserById(id, { app_metadata: { role } });
    if (error || !data.user) throw new BadRequestException(error?.message ?? 'Cannot update role');
    const u = data.user;
    return { id: u.id, email: u.email, role: (u.app_metadata as any)?.role ?? role, name: (u.user_metadata as any)?.name };
  }

  async disableUser(id: string, token: string) {
    // Soft disable: set metadata flag; Supabase does not have direct disable field, you can enforce in RLS or app logic.
    const { data, error } = await this.db.adminClient.auth.admin.updateUserById(id, { user_metadata: { disabled: true } });
    if (error || !data.user) throw new BadRequestException(error?.message ?? 'Cannot disable user');
    return { ok: true };
  }
}
