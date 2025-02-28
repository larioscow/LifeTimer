import { useEffect, useState } from 'react';

export interface timerProps {
  type?: 'seconds' | 'minutes' | 'hour';
  className?: string;
}

export const useTimer = ({ type }: timerProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [type]);

  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  return { hour, minute, second };
};
