import { useTimer } from '../hooks/TimerHook';
import { timerProps } from '../hooks/TimerHook';

export const Timer = ({ type = 'minutes', className }: timerProps) => {
  const { hour, minute, second } = useTimer({ type });

  // Función para asegurarse de que todos los valores tengan dos dígitos
  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const timer = {
    seconds: `${hour}:${formatTime(minute)}:${formatTime(second)}`,
    minutes: `${hour}:${formatTime(minute)}`,
    hour: hour,
  }[type];

  return <div className={className}>{timer}</div>;
};
