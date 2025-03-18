import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTimer } from '../hooks/TimerHook';
import { Progress } from './UI/progress';
import clsx from 'clsx';
import useTaskStore from '../stores/useTaskStore';

export interface Task {
  name: string;
  startHour: string;
  endHour: string;
  index: number;
  setEditIndex: Dispatch<SetStateAction<number>>;
}

export const TaskItem = ({
  name,
  startHour,
  endHour,
  index,
  setEditIndex,
}: Task) => {
  const { within, getProgress, to12Hour } = useTimer({});
  const { openEditTask } = useTaskStore();
  const [isCurrent, setIsCurrent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleClick = (index: number) => {
    setEditIndex(index);
    openEditTask();
  };

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
    <>
      <div
        onClick={() => handleClick(index)}
        className={clsx(
          'capitalize border rounded-md min-w-64 w-full font-geist relative p-3 transition-all duration-150 md:h-52 md:min-w-96 snap-center',
          isDone && 'opacity-50',
          !isDone && !isCurrent && 'opacity-60'
        )}
      >
        <div className="relative z-10 flex justify-between items-center p-3">
          <h2 className={clsx('font-medium', isDone && 'line-through')}>
            {name}
          </h2>
          <h3 className="flex space-x-1 text-sm">
            <span>{to12Hour(startHour)}</span>
            <span>-</span>
            <span>{to12Hour(endHour)}</span>
          </h3>
        </div>
        {isCurrent && <Progress percentage={percentage} />}
      </div>
    </>
  );
};
