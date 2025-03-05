import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/TimerHook';
import { Progress } from './UI/progress';
import clsx from 'clsx';

export interface Task {
  name: string;
  startHour: string;
  endHour: string;
}

export const TaskItem = ({ name, startHour, endHour }: Task) => {
  const { formatHour, within, getProgress } = useTimer({});
  const [isCurrent, setIsCurrent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const { progress, endHourString, currentHour } = getProgress(
      startHour,
      endHour
    );
    const newPercentage = progress;
    const isTaskCurrent = within(startHour, endHour);

    setIsCurrent(isTaskCurrent);
    setPercentage(isTaskCurrent ? newPercentage : 0);
    setIsDone(endHourString < currentHour);
  }, [endHour, startHour, within, getProgress]);

  return (
    <div
      className={clsx(
        'border-2 rounded-md min-w-64 w-full font-geist relative p-3 transition-all duration-150 md:h-52 md:min-w-96 snap-center',
        isDone && 'opacity-50',
        !isDone && !isCurrent && 'opacity-60'
      )}
    >
      <div className="relative z-10 flex items-center justify-between p-3">
        <h2 className={clsx('font-medium', isDone && 'line-through')}>
          {name}
        </h2>
        <h3 className="flex space-x-1 text-sm">
          <span>{formatHour(startHour)}</span>
          <span>-</span>
          <span>{endHour}</span>
        </h3>
      </div>
      {isCurrent && <Progress percentage={percentage} />}
    </div>
  );
};
