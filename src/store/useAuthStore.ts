import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: number;
  email: string;
  username?: string;
};

type SetUserPayload = {
  user: AuthUser;
  token: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  setUser: (data: SetUserPayload) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: ({ user, token }) => {
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
