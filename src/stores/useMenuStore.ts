import { create } from 'zustand';

// Definimos la interfaz para el estado del menú
interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}

// Creamos el store tipado
const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;
