import { Timer } from './timer';
import { Card } from './UI/card';
import useMenuStore from '../stores/useMenuStore';

export const Menu = () => {
  const { isOpen } = useMenuStore();
  return (
    <>
      {isOpen && (
        <div className="flex flex-col w-2/3 space-y-2">
          <Card>
            <Timer className="flex-center text-5xl font-bold antialiased font-dm" />
          </Card>
          <Card>
            <h2>Tasks</h2>
          </Card>
          <Card>
            <h2>Pomodoro</h2>
          </Card>
        </div>
      )}
    </>
  );
};
