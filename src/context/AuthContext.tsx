import { AuthContextType } from '@/types/auth-context-type';
import { User } from '@/types/user';

import { createContext, ReactNode, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {};

  const signUp = async (email: string, password: string) => {};

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
