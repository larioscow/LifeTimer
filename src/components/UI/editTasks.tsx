import { MdModeEditOutline } from 'react-icons/md';
import useMenuStore from '../../stores/useMenuStore';

export const EditTasks = () => {
  const { isAddTaskOpen } = useMenuStore();
  return (
    <>
      {!isAddTaskOpen && (
        <button>
          <div className="w-10 h-10 bg-black text-white text-center text-xl flex-center rounded-full antialiased">
            <MdModeEditOutline />
          </div>
        </button>
      )}
    </>
  );
};
