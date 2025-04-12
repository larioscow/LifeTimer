import { useState, ReactNode } from 'react';
import axios from 'axios';
import useTaskStore from '../../stores/useTaskStore';
import useMenuStore from '../../stores/useMenuStore';
import { Confirm } from './confirm';

interface props {
  tittle: string;
  icon: ReactNode;
  id?: string;
}

export const MenuItem = ({ tittle, icon, id }: props) => {
  const [confirm, setConfirm] = useState(false);
  const { deleteAllTasks, setTasks } = useTaskStore();
  const { closeAll, setUserState } = useMenuStore();

  const deleteTasks = async () => {
    await deleteAllTasks();
    closeAll();
  };

  const logout = async () => {
    try {
      await axios.post('https://life-timer-api.larioscow.dev/logout', null, {
        withCredentials: true,
      });
      setUserState(null);
      closeAll();
      setTasks([]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // const save = async () => {
  //   try {
  //     await axios.post(
  //       'https://life-timer-api.larioscow.dev/tasks',
  //       { tasks: tasks },
  //       { withCredentials: true }
  //     );
  //     closeAll();
  //   } catch (error) {
  //     console.error('Error saving tasks:', error);
  //   }
  // };

  const actions: Record<
    string,
    { action: () => void; message: string } | undefined
  > = {
    delete: { action: deleteTasks, message: 'Delete all tasks?' },
    logout: { action: logout, message: 'Log out?' },
    // save: { action: save, message: 'Save tasks?' },
  };

  return (
    <div>
      <div
        onClick={() => setConfirm(true)}
        className="flex items-center justify-between rounded-lg p-4 bg-black text-white font-geist dark:border-neutral-30 dark:border cursor-pointer"
      >
        <span>{tittle}</span>
        <div className="text-xl antialiased">{icon}</div>
      </div>
      {
        <Confirm
          confirm={confirm}
          setConfirm={setConfirm}
          action={actions[id!]?.action || (() => {})}
          message={actions[id ?? '']?.message || ''}
        />
      }
    </div>
  );
};
