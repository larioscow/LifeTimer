import { ReactNode } from 'react';

interface props {
  tittle: string;
  icon: ReactNode;
  toggle?: () => void;
}

export const MenuItem = ({ tittle, icon, toggle }: props) => {
  return (
    <div
      onClick={toggle}
      className="flex items-center justify-between rounded-lg p-4 bg-black text-white font-geist"
    >
      <span>{tittle}</span>
      <div className="text-xl antialiased">{icon}</div>
    </div>
  );
};
