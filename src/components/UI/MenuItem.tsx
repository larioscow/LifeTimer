import { ReactNode, useState } from 'react';
import useTaskStore from '../../stores/useTaskStore';
import useMenuStore from '../../stores/useMenuStore';

interface props {
  tittle: string;
  icon: ReactNode;
  id?: string;
}

export const MenuItem = ({ tittle, icon, id }: props) => {
  const { deleteAllTasks } = useTaskStore();
  const { closeAll } = useMenuStore();
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    if (id === 'delete') {
      deleteAllTasks();
      closeAll();
    }
  };

  return (
    <>
      <div
        onClick={() => setConfirm(true)}
        className="flex items-center justify-between rounded-lg p-4 bg-black text-white font-geist dark:border-neutral-30 dark:border cursor-pointer"
      >
        <span>{tittle}</span>
        <div className="text-xl antialiased">{icon}</div>
      </div>
      {id === 'delete' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {confirm && (
            <div className="flex flex-col bg-white p-6 border rounded-md w-48 gap-3 text-black dark:bg-black dark:text-white">
              <h3 className="font-medium text-center">Delete all tasks?</h3>
              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  className="bg-black rounded-md py-2 px-5 text-white dark:bg-neutral-300 font-medium dark:text-black"
                >
                  Yes
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirm(false);
                  }}
                  className="border rounded-md py-2 px-5"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
