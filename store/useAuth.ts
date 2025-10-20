import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User } from '../lib/api.mock';
import { apiRequest } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const res = await apiRequest<{ accessToken: string; refreshToken: string; user: User }>(
            '/auth/login',
            { method: 'POST', body: { email, password } }
          );
          set({ user: res.user, token: res.accessToken, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        try {
          const res = await apiRequest<{ accessToken: string; refreshToken: string; user: User }>(
            '/auth/register',
            { method: 'POST', body: { 
              email: userData.email,
              password: (userData as any).password || 'changeme123',
              role: (userData.role as any) || 'client',
              firstName: userData.firstName,
              lastName: userData.lastName,
              phone: userData.phone,
            } }
          );
          set({ user: res.user, token: res.accessToken, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
