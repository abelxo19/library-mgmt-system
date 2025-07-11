'use client';
import { useAuth } from '../lib/useAuth';
import LoginPage from '../app/login/page';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
} 