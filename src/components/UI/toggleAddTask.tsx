import { IoMdAdd, IoMdClose } from 'react-icons/io';

import useMenuStore from '../../stores/useMenuStore';
import clsx from 'clsx';

export const ToggleAddTask = () => {
  const { isAddTaskOpen, openAddTask, closeAll } = useMenuStore();
  return (
    <button onClick={isAddTaskOpen ? closeAll : openAddTask}>
      <div
        className={clsx(
          `w-10 h-10 bg-black text-white text-center text-xl flex-center rounded-full antialiased`,
          isAddTaskOpen && 'bg-red-500'
        )}
      >
        {!isAddTaskOpen ? <IoMdAdd /> : <IoMdClose />}
      </div>
    </button>
  );
};
