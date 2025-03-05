import { useEffect, useRef, useState } from 'react';
import { TaskItem, Task } from './task';
import { useTimer } from '../hooks/TimerHook';

type Tasks = Task[];

export const Tasks = () => {
  const [tasks, setTasks] = useState<Tasks>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { within } = useTimer({});
  const current = tasks.findIndex((task) =>
    within(task.startHour, task.endHour)
  );

  useEffect(() => {
    const taskArr = [
      {
        name: 'Speak with my anoying girlfriend',
        startHour: '19:00',
        endHour: '22:00',
      },
      {
        name: 'Play LoL',
        startHour: '22:00',
        endHour: '24:00',
      },
    ];
    setTasks(taskArr);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const containerWidth = containerRef.current?.scrollWidth ?? 0;
      const elements = containerRef.current?.childNodes.length ?? 1;

      const scrollPosition = (current / elements) * containerWidth;

      // Realiza el scroll suave al cargar o cambiar el tamaño de la pantalla
      containerRef.current?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      console.log(scrollPosition);
    };

    window.addEventListener('resize', handleScroll);
    handleScroll(); // Ejecuta el scroll al cargar el componente

    return () => window.removeEventListener('resize', handleScroll);
  }, [tasks, current]);

  return (
    <div
      ref={containerRef}
      className="h-full md:px-6 w-5/6 flex flex-col items-center space-y-2.5 md:space-x-2.5 md:space-y-0 md:flex-row md:overflow-x-scroll scroll-smooth snap-x"
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
