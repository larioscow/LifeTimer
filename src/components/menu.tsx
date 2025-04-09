import { MenuItem } from './UI/MenuItem';
// import { IoAnalytics } from 'react-icons/io5';
// import { IoPencil } from 'react-icons/io5';
import { IoLogOut, IoSave, IoTrash } from 'react-icons/io5';
import { ReactNode } from 'react';
import { AddTask } from './addTask';

import useMenuStore from '../stores/useMenuStore';

interface option {
  tittle: string;
  icon: ReactNode;
  id?: string;
}
type options = option[];

const options: options = [
  // { tittle: 'Edit schedule', icon: <IoPencil /> },
  // { tittle: 'Metrics', icon: <IoAnalytics /> },
  { tittle: 'Delete all tasks', icon: <IoTrash />, id: 'delete' },
  { tittle: 'Save tasks', icon: <IoSave />, id: 'save' },
  { tittle: 'Log Out', icon: <IoLogOut />, id: 'logout' },
];

export const Menu = () => {
  const { isMenuOpen } = useMenuStore();

  return (
    <>
      {isMenuOpen && (
        <div className="flex flex-col w-5/6 md:max-w-4xl space-y-10 items-center dark:bg-black dark:text-white">
          <AddTask></AddTask>
          <div className="flex flex-col space-y-2 w-full">
            {options.map((option, key) => (
              <MenuItem
                tittle={option.tittle}
                icon={option.icon}
                key={key}
                id={option.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
