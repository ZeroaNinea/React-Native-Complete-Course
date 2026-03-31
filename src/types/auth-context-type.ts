import { User } from './user';

export interface AuthContextType {
  user: User | null;
  setUser: (user: any) => void;
}
