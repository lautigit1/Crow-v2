// app/hooks/useAuthInit.ts
import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export function useAuthInit() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);
}