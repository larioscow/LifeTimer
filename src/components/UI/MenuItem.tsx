import { ReactNode } from 'react';

interface props {
  tittle: string;
  icon: ReactNode;
}

export const MenuItem = ({ tittle, icon }: props) => {
  return (
    <div className="flex items-center justify-between rounded-lg p-4 bg-black text-white font-geist">
      <span>{tittle}</span>
      <div className="text-xl antialiased">{icon}</div>
    </div>
  );
};
