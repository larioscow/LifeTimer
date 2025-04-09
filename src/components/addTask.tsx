import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import useTaskStore from '../stores/useTaskStore';
import useMenuStore from '../stores/useMenuStore';

export const AddTask = () => {
  const { toggle } = useMenuStore();
  const { addTask } = useTaskStore();

  const [taskName, setTaskName] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const currentTime = new Date();
    const formattedHour = currentTime.getHours().toString().padStart(2, '0');
    const formattedMinute = currentTime
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const currentTimeString = `${formattedHour}:${formattedMinute}`;

    setStartHour(currentTimeString);
    const endDate = new Date(currentTime);
    endDate.setHours(endDate.getHours() + 1);
    const endHourString = `${endDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    setEndHour(endHourString);
  }, []);

  const handleStartHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartHour(e.target.value);
    if (e.target.value >= endHour) {
      setError('Start time must be earlier than end time');
    } else {
      setError('');
    }
  };

  const handleEndHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndHour(e.target.value);
    if (e.target.value <= startHour) {
      setError('End time must be later than start time');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (error) return;

    addTask({ name: taskName, startHour, endHour });
    setTaskName('');

    const currentTime = new Date();
    const formattedHour = currentTime.getHours().toString().padStart(2, '0');
    const formattedMinute = currentTime
      .getMinutes()
      .toString()
      .padStart(2, '0');
    setStartHour(`${formattedHour}:${formattedMinute}`);
    toggle();
  };

  return (
    <div className="flex flex-col space-y-4 border rounded-md p-6 w-full shadow-md bg-white lg:p-8 lg:gap-5 dark:bg-black dark:text-white">
      <h2 className="text-xl font-bold text-center lg:text-2xl ">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        <div className="flex flex-col">
          <label htmlFor="taskName" className="font-medium mb-1">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTaskName(e.target.value)
            }
            placeholder="Enter task name"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 md:py-3"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label htmlFor="startHour" className="flex flex-col">
            <span className="font-medium mb-1">From:</span>
            <input
              type="time"
              id="startHour"
              value={startHour}
              onChange={handleStartHourChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 md:py-3"
              required
            />
          </label>
          <label htmlFor="endHour" className="flex flex-col">
            <span className="font-medium mb-1">To:</span>
            <input
              type="time"
              id="endHour"
              value={endHour}
              onChange={handleEndHourChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 md:py-3"
              required
            />
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full md:py-3 bg-black cursor-pointer text-white font-medium py-2 px-4 rounded-md transition duration-100 dark:text-black dark:bg-neutral-300"
          disabled={!!error}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
