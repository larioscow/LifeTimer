import { useTimer, timerProps } from '../hooks/TimerHook';

export const Timer = ({ className }: timerProps) => {
  const { timer } = useTimer({ type: 'minutesTimer', className: className });

  return <div className={className}>{timer}</div>;
};
