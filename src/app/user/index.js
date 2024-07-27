import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      sidebar: true,
      jwt: null,

      setUser: (user) => set(() => ({ user })),

      updateUserData: (data) => set((state) => ({ user: { ...state.user, ...data } })),

      setJwt: (token) => set(() => ({ jwt: token })),

      clearUser: () => set(() => ({ user: null, jwt: null })),

      setSidebar: () => set((state) => ({ sidebar: !state.sidebar })),

      setDefaultSidebar: () => set((state) => ({ sidebar: false })),
    }),
    {
      name: "elite-budget",
    }
  )
);

export default useUserStore;
