import { create } from 'zustand';

// Definimos la interfaz para el estado del menú
interface MenuState {
  isMenuOpen: boolean;
  isAddTaskOpen: boolean;
  toggle: () => void;
  openAddTask: () => void;
  closeAll: () => void;
  // toggleAddTask: () => void;
}

// Creamos el store tipado
const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  isAddTaskOpen: false,
  toggle: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  openAddTask: () =>
    set((state) => ({ isAddTaskOpen: (state.isAddTaskOpen = true) })),
  closeAll() {
    set((state) => ({
      isAddTaskOpen: (state.isAddTaskOpen = false),
      isMenuOpen: (state.isMenuOpen = false),
    }));
  },
  // toggleAddTask: () =>
  //   set((state) => ({ isAddTaskOpen: !state.isAddTaskOpen })),
}));

export default useMenuStore;
