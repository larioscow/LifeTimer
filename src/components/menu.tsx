import { Timer } from './timer';
import { MenuItem } from './UI/MenuItem';
import useMenuStore from '../stores/useMenuStore';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoAnalytics } from 'react-icons/io5';
import { IoPencil } from 'react-icons/io5';

import { ReactNode } from 'react';

interface option {
  tittle: string;
  icon: ReactNode;
}
type options = option[];

const options: options = [
  { tittle: 'Add a task', icon: <IoAddCircleOutline /> },
  { tittle: 'Edit schedule', icon: <IoPencil /> },
  { tittle: 'Metrics', icon: <IoAnalytics /> },
];

export const Menu = () => {
  const { isOpen } = useMenuStore();
  return (
    <>
      {isOpen && (
        <div className="flex flex-col w-2/3 space-y-5">
          <Timer className="flex-center text-5xl font-bold antialiased font-dm" />
          <div className="flex flex-col space-y-1">
            {options.map((option, key) => (
              <MenuItem tittle={option.tittle} icon={option.icon} key={key} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
