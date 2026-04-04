import { User } from './user';

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  fetchUserProfile?: (userId: string) => Promise<User | null>;
}
