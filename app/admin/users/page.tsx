'use client';

import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, disableUser, purgeTestUsers, promoteUsersByIdentifiers } from '../../lib/admin-api';
import { useAuthStore } from '../../stores/useAuthStore';
import type { User } from '../../types/auth';

export default function UsersPage() {
  const user = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'authenticated' | 'admin'>('all');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Solo cargar datos si hay usuario autenticado
    if (user) {
      loadUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (userId: string, newRole: 'authenticated' | 'admin') => {
    if (!confirm(`¿Cambiar rol de usuario a ${newRole === 'admin' ? 'Administrador' : 'Cliente'}?`)) {
      return;
    }

    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Error al cambiar rol');
    }
  };

  const handleDisableUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de que quieres deshabilitar este usuario?')) {
      return;
    }

    try {
      await disableUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error disabling user:', error);
      alert('Error al deshabilitar usuario');
    }
  };

  const handlePurgeTests = async () => {
    if (!confirm('¿Eliminar todos los usuarios de prueba? (emails que contienen test, demo, dummy, example, prueba)')) return;
    setActionLoading(true);
    try {
      const res = await purgeTestUsers();
      if (res?.deleted?.length) {
        setUsers(users.filter(u => !res.deleted.includes(u.id)));
        alert(`Eliminados ${res.deleted.length} usuarios de prueba.`);
      } else {
        alert('No se encontraron usuarios de prueba para eliminar.');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al purgar usuarios de prueba';
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromoteLautaro = async () => {
    if (!confirm('¿Promocionar a admin todos los usuarios que coincidan con "lautaro" o "salinas"?')) return;
    setActionLoading(true);
    try {
      const res = await promoteUsersByIdentifiers(['lautaro','salinas']);
      if (res?.promoted?.length) {
        setUsers(users.map(u => res.promoted.includes(u.id) ? { ...u, role: 'admin' } : u));
        alert(`Promocionados ${res.promoted.length} usuarios a admin.`);
      } else {
        alert('No se encontraron usuarios para promocionar.');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al promocionar usuarios';
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⚙️</div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-2">{filteredUsers.length} usuarios encontrados</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadUsers}
            disabled={actionLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
          </button>
          <button
            onClick={handlePurgeTests}
            disabled={actionLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            🧹 Purgar Test
          </button>
          <button
            onClick={handlePromoteLautaro}
            disabled={actionLoading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            👑 Promocionar Lautaro
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar usuario
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por email o nombre..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por rol
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as 'all' | 'authenticated' | 'admin')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="authenticated">Clientes</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Registrado
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {user.fullName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName || 'Sin nombre'}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === 'admin' ? (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        👑 Administrador
                      </span>
                    ) : (
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Cliente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-AR') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {user.role === 'admin' ? (
                        <button
                          onClick={() => handleChangeRole(user.id, 'authenticated')}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-xs"
                        >
                          Quitar Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => handleChangeRole(user.id, 'admin')}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs"
                        >
                          Hacer Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDisableUser(user.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs"
                      >
                        Deshabilitar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <span className="text-6xl mb-4 block">👥</span>
            <p className="font-medium">No se encontraron usuarios</p>
            <p className="text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
}
