import { UsersService } from '../src/users/users.service.js';

describe('UsersService (unit minimal)', () => {
  const mockDb: any = {
    forUser: () => ({
      from: () => ({
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: { id: 'u1', name: 'Nuevo' }, error: null }) }) }) }),
        select: () => ({ eq: () => ({ single: () => ({ data: { id: 'u1', name: 'Actual' }, error: null }) }) })
      })
    }),
    adminClient: {
      auth: {
        admin: {
          listUsers: async () => ({ data: { users: [{ id: 'u1', email: 'a@b.com', app_metadata: { role: 'authenticated' }, user_metadata: { name: 'Tester' } }] }, error: null }),
          getUserById: async () => ({ data: { user: { id: 'u1', email: 'a@b.com', app_metadata: { role: 'authenticated' }, user_metadata: { name: 'Tester' } } }, error: null }),
          updateUserById: async () => ({ data: { user: { id: 'u1', email: 'a@b.com', app_metadata: { role: 'admin' }, user_metadata: { name: 'Tester' } } }, error: null }),
        }
      }
    }
  };

  it('updates current user name', async () => {
    const svc = new UsersService(mockDb);
    const res = await svc.updateMe('u1', { name: 'Nuevo' }, 'token');
    expect(res.name).toBe('Nuevo');
  });

  it('lists users (admin)', async () => {
    const svc = new UsersService(mockDb);
    const list = await svc.listUsers('token');
    expect(list[0].email).toBe('a@b.com');
  });

  it('updates user role', async () => {
    const svc = new UsersService(mockDb);
    const updated = await svc.updateUserRole('u1', 'admin', 'token');
    expect(updated.role).toBe('admin');
  });
});