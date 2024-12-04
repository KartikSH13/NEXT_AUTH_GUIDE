'use client';
import { SessionProvider } from 'next-auth/react';
export const NextAuthProvider = ({ session, children }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};