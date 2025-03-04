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
  const timeToInt = (time: `${string}:${string}`) =>
    time.split(':').map((x) => Number(x));

  const timer = {
    secondsTimer: `${hour}:${formatTime(minute)}:${formatTime(second)}`,
    minutesTimer: `${hour}:${formatTime(minute)}`,
    hourTimer: hour,
  }[type];

  return { hour, minute, second, timer, timeToInt, formatTime, formatHour };
};
