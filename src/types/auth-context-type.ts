import { User } from './user';

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
}
