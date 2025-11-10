// app/hooks/useAuthInit.ts
import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export function useAuthInit() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    // Solo verificar sesión si hay tokens guardados
    // Esto permite que usuarios que hicieron login vuelvan autenticados
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      checkSession();
    }
  }, [checkSession]);
}