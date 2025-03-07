import { useEffect, useRef, useState } from 'react';
import { TaskItem } from './task';
import { useTimer } from '../hooks/TimerHook';
import useTaskStore from '../stores/useTaskStore';

export const Tasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const sortTasks = useTaskStore((state) => state.sortTasks);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { within } = useTimer({});
  const current = tasks.findIndex((task) =>
    within(task.startHour, task.endHour)
  );

  useEffect(() => {
    if (!isSorted) {
      sortTasks();
      setIsSorted(true);
    }
  }, [sortTasks, isSorted]);

  useEffect(() => {
    const handleScroll = () => {
      const containerWidth = containerRef.current?.scrollWidth ?? 0;
      const elements = containerRef.current?.childNodes.length ?? 1;

      const scrollPosition = (current / elements) * containerWidth;

      containerRef.current?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      console.log(scrollPosition);
    };

    window.addEventListener('resize', handleScroll);
    handleScroll();

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
      {!tasks[0] && (
        <span className="text-xl text-center w-full">Add a task.</span>
      )}
    </div>
  );
};

export default Tasks;
