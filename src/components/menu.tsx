import { Timer } from './timer';
import { MenuItem } from './UI/MenuItem';
import { IoAnalytics } from 'react-icons/io5';
import { IoPencil } from 'react-icons/io5';
import { ReactNode } from 'react';
import { AddTask } from './addTask';

import useMenuStore from '../stores/useMenuStore';

interface option {
  tittle: string;
  icon: ReactNode;
}
type options = option[];

const options: options = [
  { tittle: 'Edit schedule', icon: <IoPencil /> },
  { tittle: 'Metrics', icon: <IoAnalytics /> },
];

export const Menu = () => {
  const { isMenuOpen } = useMenuStore();

  return (
    <>
      {isMenuOpen && (
        <div className="flex flex-col w-2/3 space-y-10 items-center">
          <Timer
            className="flex-center text-5xl font-bold antialiased font-dm"
            type="minutesTimer"
          />
          <AddTask></AddTask>
          <div className="flex flex-col space-y-2 w-full">
            {options.map((option, key) => (
              <MenuItem tittle={option.tittle} icon={option.icon} key={key} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
