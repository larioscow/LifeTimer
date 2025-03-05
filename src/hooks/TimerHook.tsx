import { useEffect, useState } from 'react';

export interface timerProps {
  type?: 'secondsTimer' | 'minutesTimer' | 'hourTimer';
  className?: string;
}

export const useTimer = ({ type = 'minutesTimer' }: timerProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  const formatTime = (time: number) => time.toString().padStart(2, '0');
  const formatHour = (time: string) =>
    time.charAt(0) === '0' ? time.slice(1) : time;
  const timeToInt = (time: string) => time.split(':').map((x) => Number(x));
  const within = (startHour: string, endHour: string) => {
    const currentHour = `${formatTime(hour)}:${formatTime(minute)}`;
    const isTaskCurrent = startHour <= currentHour && endHour >= currentHour;
    return isTaskCurrent;
  };
  const getProgress = (startHour: string, endHour: string) => {
    const [hourStart, minuteStart] = timeToInt(startHour);
    const [hourEnd, minuteEnd] = timeToInt(endHour);
    const taskTotalMinutes =
      (hourEnd - hourStart) * 60 + (minuteEnd - minuteStart);
    const minutesFromStart = Math.max(
      0,
      hour * 60 + minute - (hourStart * 60 + minuteStart)
    );
    const progress = (minutesFromStart * 100) / taskTotalMinutes;
    const currentHour = `${formatTime(hour)}:${formatTime(minute)}`;
    const endHourString = `${formatTime(hourEnd)}:${formatTime(minuteEnd)}`;

    return {
      taskTotalMinutes,
      minutesFromStart,
      progress,
      currentHour,
      endHourString,
    };
  };
  const isNewTask = (startHour: string) => {
    const currentHour = `${formatTime(hour)}:${formatTime(minute)}`;
    return startHour === currentHour;
  };

  const timer = {
    secondsTimer: `${hour}:${formatTime(minute)}:${formatTime(second)}`,
    minutesTimer: `${hour}:${formatTime(minute)}`,
    hourTimer: hour,
  }[type];

  return {
    hour,
    minute,
    second,
    timer,
    timeToInt,
    formatTime,
    formatHour,
    within,
    getProgress,
    isNewTask,
  };
};
