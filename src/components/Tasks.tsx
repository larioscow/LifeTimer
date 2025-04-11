/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import useTaskStore from '../stores/useTaskStore';
import { SignedInHook } from '../hooks/signedInHook';
import { TaskItem } from './task';
import { useTimer } from '../hooks/TimerHook';
import { EditTaskWindow } from './editTaskWindow';
import { Cover } from './UI/cover';
import { IA } from './IA';
import type { Task } from './task';

export const Tasks = () => {
  const { within } = useTimer({});
  const { tasks, sortTasks, editTask, setTasks } = useTaskStore();
  const [editIndex, setEditIndex] = useState(-1);
  const [isSorted, setIsSorted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftFade, setLeftFade] = useState(false);
  const [rightFade, setRightFade] = useState(false); // Initialize as false until we check
  const [isScrollable, setIsScrollable] = useState(false);
  const { loggedIn, checkLoginStatus } = SignedInHook();

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
    checkLoginStatus();
    if (!loggedIn) return;
    try {
      // Fetch tasks from the server
      const fetchTasks = async () => {
        const response = await axios.get(
          'https://life-timer-api.larioscow.dev/tasks',
          {
            withCredentials: true,
          }
        );
        if (response.data) {
          const fetchedTasks = response.data.map((task: Task) => ({
            name: task.name,
            startHour: task.startHour,
            endHour: task.endHour,
          }));
          setTasks(fetchedTasks);
        }
      };
      fetchTasks();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [loggedIn]);

  // Check if container is scrollable
  const checkScrollable = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Container is scrollable if scrollWidth > clientWidth
    const canScroll = container.scrollWidth > container.clientWidth;
    setIsScrollable(canScroll);

    // Only show right fade initially if scrollable
    if (canScroll) {
      setRightFade(true);
    } else {
      setRightFade(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const containerWidth = container.scrollWidth ?? 0;
      const elements = container.childNodes.length ?? 1;
      const scrollPosition = (current / elements) * containerWidth;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    };

    const handleTaskScroll = () => {
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      // Show left fade when scrolled right
      setLeftFade(scrollLeft > 0);

      // Show right fade when there's more content to scroll to
      // AND the container is actually scrollable
      const isAtRightEdge = scrollLeft + clientWidth >= scrollWidth - 5; // 5px tolerance
      setRightFade(scrollWidth > clientWidth && !isAtRightEdge);
    };

    window.addEventListener('resize', () => {
      checkScrollable();
      handleScroll();
    });

    if (container) {
      container.addEventListener('scroll', handleTaskScroll);
    }

    // Initial checks
    checkScrollable();
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkScrollable);
      if (container) {
        container.removeEventListener('scroll', handleTaskScroll);
      }
    };
  }, [tasks, current]);

  return (
    <>
      <div className="relative w-5/6 h-full flex justify-center items-center align-middle dark:text-neutral-300 md:m-0">
        <div
          className={`hidden md:block absolute left-0 top-0 h-5/6 w-8 md:w-16 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none ${
            leftFade ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        <div
          ref={containerRef}
          className={clsx(
            'custom-scrollbar h-2/4 md:px-6 w-full flex flex-col items-center justify-center space-y-2.5 md:space-x-2.5 md:space-y-0 md:flex-row scroll-smooth snap-x',
            isScrollable && 'md:overflow-x-scroll'
          )}
          onScroll={() => {
            if (containerRef.current) {
              const container = containerRef.current;
              setLeftFade(container.scrollLeft > 0);

              // Only show right fade if content is wider than container
              // and we're not at the right edge
              const hasMoreContent =
                container.scrollWidth > container.clientWidth;
              const isAtRightEdge =
                container.scrollLeft + container.clientWidth >=
                container.scrollWidth - 5;
              setRightFade(hasMoreContent && !isAtRightEdge);
            }
          }}
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

          {!tasks.length && <IA />}
        </div>

        <div
          className={`hidden md:block absolute right-0 top-0 h-5/6 w-8 md:w-16 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none ${
            rightFade && isScrollable ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
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
