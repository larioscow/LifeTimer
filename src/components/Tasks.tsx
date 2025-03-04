import { useEffect, useState } from 'react';
import { TaskItem, Task } from './task';

type Tasks = Task[];

export const Tasks = () => {
  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    setTasks([
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
        startHour: '23:49',
        endHour: '24:00',
      },
    ]);

    // return () => {
    //   console.log('a');
    // };
  }, []);

  return (
    <div className="h-full w-5/6 flex flex-col items-center space-y-2">
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
