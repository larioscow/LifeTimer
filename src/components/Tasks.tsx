import { useEffect, useState } from 'react';
import { TaskItem, Task } from './task';

type Tasks = Task[];

export const Tasks = () => {
  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    setTasks([
      {
        name: 'Do the dishes',
        startHour: '5:00',
        endHour: '6:30',
      },
      {
        name: 'UDG',
        startHour: '7:00',
        endHour: '9:00',
      },
      {
        name: 'Programar esta cosa',
        startHour: '22:00',
        endHour: '23:49',
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
