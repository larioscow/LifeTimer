import { create } from 'zustand';

// Definimos la interfaz para el estado del menú
interface MenuState {
  isMenuOpen: boolean;
  toggle: () => void;
}

// Creamos el store tipado
const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  isAddTaskOpen: false,
  toggle: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useMenuStore;
