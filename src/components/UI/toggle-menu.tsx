import { HiViewGridAdd } from 'react-icons/hi';
import useMenuStore from '../../stores/useMenuStore';

export const ToggleMenu = () => {
  const { toggle } = useMenuStore();

  return (
    <button onClick={toggle}>
      <div className="w-14 h-14 bg-black text-white text-center text-2xl flex-center rounded-full absolute bottom-5 right-5 antialiased">
        <HiViewGridAdd />
      </div>
    </button>
  );
};
