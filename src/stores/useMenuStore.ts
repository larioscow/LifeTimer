import { create } from 'zustand';

type UserState = {
  id: string;
  username: string;
} | null;

// Definimos la interfaz para el estado del menú
interface MenuState {
  isMenuOpen: boolean;
  isAddTaskOpen: boolean;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  userState: UserState | null;
  toggle: () => void;
  openAddTask: () => void;
  openLogIn: () => void;
  openRegister: () => void;
  closeAll: () => void;
  setUserState: (user: UserState) => void;
  // toggleAddTask: () => void;
}

// Creamos el store tipado
const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  isAddTaskOpen: false,
  isLoginOpen: false,
  isRegisterOpen: false,
  userState: null,
  setUserState: (user: UserState) =>
    set((state) => ({ userState: (state.userState = user) })),
  openLogIn: () =>
    set((state) => ({ isLoginOpen: (state.isLoginOpen = true) })),
  openRegister: () =>
    set((state) => ({ isRegisterOpen: (state.isRegisterOpen = true) })),
  toggle: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openAddTask: () =>
    set((state) => ({ isAddTaskOpen: (state.isAddTaskOpen = true) })),
  closeAll() {
    set((state) => ({
      isAddTaskOpen: (state.isAddTaskOpen = false),
      isMenuOpen: (state.isMenuOpen = false),
      isLoginOpen: (state.isLoginOpen = false),
      isRegisterOpen: (state.isRegisterOpen = false),
    }));
  },

  // toggleAddTask: () =>
  //   set((state) => ({ isAddTaskOpen: !state.isAddTaskOpen })),
}));

export default useMenuStore;
