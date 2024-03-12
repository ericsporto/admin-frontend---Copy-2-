import { UserModel } from '@/interfaces/authInterfaces/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  token: string | null;
  setToken: (token: string) => void;
  user: UserModel | null;
  setUser: (user: UserModel) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useUserStore;
