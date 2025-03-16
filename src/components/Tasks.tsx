import { useEffect, useRef, useState } from 'react';
import { TaskItem } from './task';
import { useTimer } from '../hooks/TimerHook';
import { EditTaskWindow } from './editTaskWindow';
import useTaskStore from '../stores/useTaskStore';
import { Cover } from './UI/cover';

export const Tasks = () => {
  const { within } = useTimer({});
  const { tasks, sortTasks, editTask } = useTaskStore();
  const [editIndex, setEditIndex] = useState(-1); // Fixed destructuring issue
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the current task
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
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.scrollWidth ?? 0;
      const elements = containerRef.current.childNodes.length ?? 1;
      const scrollPosition = (current / elements) * containerWidth;

      containerRef.current.scrollTo({
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
    <>
      <div
        ref={containerRef}
        className="h-full md:px-6 w-5/6 flex flex-col items-center space-y-2.5 md:space-x-2.5 md:space-y-0 md:flex-row md:overflow-x-scroll scroll-smooth snap-x"
      >
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            name={task.name}
            startHour={task.startHour}
            endHour={task.endHour}
            index={index}
            setEditIndex={setEditIndex}
          />
        ))}

        {!tasks.length && (
          <span className="text-xl text-center w-full">Add a task.</span>
        )}
      </div>
      {editTask &&
        tasks
          .filter((_, index) => index === editIndex)
          .map((task, key) => (
            <div key={key}>
              <EditTaskWindow
                name={task.name}
                startHour={task.startHour}
                endHour={task.endHour}
                index={editIndex}
              />
              <Cover />
            </div>
          ))}
    </>
  );
};

export default Tasks;
