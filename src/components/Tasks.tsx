import { useEffect, useRef, useState } from 'react';
import { TaskItem, Task } from './task';
import { useTimer } from '../hooks/TimerHook';

type Tasks = Task[];

export const Tasks = () => {
  const [tasks, setTasks] = useState<Tasks>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { within } = useTimer({});

  useEffect(() => {
    const taskArr = [
      {
        name: 'Do the dishes',
        startHour: '05:00',
        endHour: '06:30',
      },
      {
        name: 'UDG',
        startHour: '07:00',
        endHour: '09:00',
      },
      {
        name: 'Excercise',
        startHour: '09:00',
        endHour: '11:00',
      },
      {
        name: 'Morir',
        startHour: '11:00',
        endHour: '12:00',
      },
      {
        name: 'Morir',
        startHour: '13:35',
        endHour: '14:00',
      },
    ];
    setTasks(taskArr);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.scrollWidth ?? 0;
      const elements = containerRef.current?.childNodes.length ?? 1;
      const taskArr = [...tasks];
      const current = taskArr.findIndex((task) =>
        within(task.startHour, task.endHour)
      );
      const scrollPosition = (current / elements) * containerWidth;
      console.log(scrollPosition);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecuta la función inmediatamente al montar el componente

    return () => window.removeEventListener('resize', handleResize);
  }, [tasks, within]);

  return (
    <div
      ref={containerRef}
      className="h-full w-5/6 flex flex-col items-center space-y-2.5 md:space-x-2.5 md:space-y-0 md:flex-row md:overflow-x-scroll scroll-smooth snap-x"
    >
      {tasks.map((task, key) => (
        <TaskItem
          key={key}
          name={task.name}
          startHour={task.startHour}
          endHour={task.endHour}
        />
      ))}
      {!tasks[0] && <span>No tasks</span>}
    </div>
  );
};

export default Tasks;
