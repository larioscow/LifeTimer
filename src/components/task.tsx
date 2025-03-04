import { useEffect, useState } from 'react';
import { useTimer } from '../hooks/TimerHook';
import { Progress } from './UI/progress';
import clsx from 'clsx';

export interface Task {
  name: string;
  startHour: `${number}:${number}`;
  endHour: `${number}:${number}`;
}

export const TaskItem = ({ name, startHour, endHour }: Task) => {
  const { timer, hour, minute, second, timeToInt, formatTime, formatHour } =
    useTimer({});
  const [isCurrent, setIsCurrent] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const [hourStart, minuteStart] = timeToInt(startHour);
    const [hourEnd, minuteEnd] = timeToInt(endHour);

    const taskTotalMinutes =
      (hourEnd - hourStart) * 60 + (minuteEnd - minuteStart);
    const minutesFromStart = Math.max(
      0,
      hour * 60 + minute - (hourStart * 60 + minuteStart)
    );
    const newPercentage = (minutesFromStart * 100) / taskTotalMinutes;

    const currentHour = `${formatTime(hour)}:${formatTime(minute)}`;
    const endHourString = `${formatTime(hourEnd)}:${formatTime(minuteEnd)}`;

    const isTaskCurrent = startHour <= currentHour && endHour >= currentHour;

    setIsCurrent(isTaskCurrent);
    setPercentage(isTaskCurrent ? newPercentage : 0);
    setIsDone(endHourString < currentHour);
  }, [second, endHour, hour, minute, startHour, timeToInt, timer, formatTime]);

  return (
    <div
      className={clsx(
        'border-2 rounded-md min-w-64 w-full font-geist relative p-3 transition-all duration-300',
        isDone && 'opacity-50',
        !isDone && !isCurrent && 'opacity-60'
      )}
    >
      {isCurrent && <Progress percentage={percentage} />}
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
      {isDone}
    </div>
  );
};
