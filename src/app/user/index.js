import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create()(
  persist(
    (set) => ({
      user: null,
      root: null,
      sidebar: true,
      jwt: null,
      isRefresh: true,

      setUser: (user, root) => set(() => ({ user, root })),

      updateUserData: (data) => set((state) => ({ user: { ...state.user, ...data } })),

      setJwt: (token) => set(() => ({ jwt: token })),

      updateRoot: (root) => set((state) => ({ root: { ...state.root, ...root } })),

      clearUser: () => set(() => ({ user: null, jwt: null, root: null })),

      setSidebar: () => set((state) => ({ sidebar: !state.sidebar })),

      setIsRefresh: (refresh) => set(() => ({ isRefresh: refresh })),
    }),
    {
      name: "elite-budget",
    }
  )
);

export default useUserStore;
