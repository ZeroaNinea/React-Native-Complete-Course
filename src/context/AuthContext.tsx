import { getSupabase } from '@/lib/supabase/client';
import { AuthContextType } from '@/types/auth-context-type';
import { User } from '@/types/user';

import { createContext, ReactNode, useContext, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // let supabase: any;

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;

  //   supabase = getSupabase();
  // }, []);

  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    const supabase = getSupabase();
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (!data) {
        console.error('No profile data returned.');
        return null;
      }

      const authUser = await supabase.auth.getUser();
      if (!authUser.data.user) {
        console.error('No auth user found.');
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        username: data.username,
        email: authUser.data.user.email || '',
        profileImage: data.user_image,
        onboardingCompleted: data.onboarding_completed,
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {};

  const signUp = async (email: string, password: string) => {
    const supabase = getSupabase();

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    // Wait for the session.
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log('No session yet, skipping profile creation');
      return;
    }

    if (data.user) {
      const profile = await fetchUserProfile(data.user.id);
      console.log('Profile fetched:', profile);
      setUser(profile);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    try {
      const updateData: Partial<User> = {};

      if (userData.name !== undefined) updateData.name = userData.name;
      if (userData.username !== undefined)
        updateData.username = userData.username;
      if (userData.profileImage !== undefined)
        updateData.profileImage = userData.profileImage;
      if (userData.onboardingCompleted !== undefined)
        updateData.onboardingCompleted = userData.onboardingCompleted;

      const { error } = await getSupabase()
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, updateUser, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider.');
  }

  return context;
};
