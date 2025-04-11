import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import useTaskStore from '../stores/useTaskStore';

interface Props {
  name: string;
  startHour: string;
  endHour: string;
  index: number;
}

export const EditTaskWindow = ({ name, startHour, endHour, index }: Props) => {
  const { closeEditTask, updateTask, sortTasks, removeTask } = useTaskStore();
  const [confirm, setConfirm] = useState(false);
  const [taskInput, settaskInput] = useState(name);
  const [startHourInput, setStartHourInput] = useState(startHour);
  const [endHourInput, setEndHourInput] = useState(endHour);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(index, {
      name: taskInput,
      startHour: startHourInput,
      endHour: endHourInput,
    });
    await sortTasks();
    closeEditTask();
  };

  return (
    <div className="font-geist bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[65%] border rounded-md w-5/6 z-20 pt-4 pb-2 px-2 lg:w-4xl lg:h-1/2 dark:bg-black dark:text-white dark:border-neutral-300 ">
      <div className="flex flex-col space-y-4 p-4 h-full md:gap-8 justify-around lg:justify-center lg:spacy">
        <div className="flex w-full items-center">
          <input
            id="edit"
            type="text"
            className="text-xl font-bold w-full"
            value={taskInput}
            onChange={(e) => settaskInput(e.target.value)}
          ></input>
          <label htmlFor="edit">
            <CiEdit className="text-xl" />
          </label>
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 sm:space-x-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="startHour" className="flex flex-col mb-2">
            <span className="font-medium mb-1">From:</span>
            <input
              type="time"
              id="startHour"
              value={startHourInput}
              onChange={(e) => setStartHourInput(e.target.value)}
              className="border rounded-md px-3 py-2 sm:py-3 dark:border-neutral-300"
              required
            />
          </label>
          <label
            htmlFor="endHour"
            className="flex flex-col mb-8 dark:border-neutral-300"
          >
            <span className="font-medium mb-1">To:</span>
            <input
              type="time"
              id="endHour"
              value={endHourInput}
              onChange={(e) => setEndHourInput(e.target.value)}
              className="border rounded-md px-3 py-2 sm:py-3 dark:border-neutral-300"
              required
            />
          </label>
          <div className="flex justify-around space-x-2 md:col-span-2">
            <button className="text-white bg-black rounded-xl min-w-1/3 w-full py-2 sm:py-3 dark:bg-neutral-300 dark:text-black font-medium">
              Confirm
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeEditTask();
              }}
              className="border rounded-xl min-w-1/3 w-full py-2 sm:py-3 dark:border-neutral-300"
            >
              Cancel
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setConfirm(true);
            }}
            className="text-red-600 bg-red-200 dark:bg-red-500 dark:text-red-100  00 py-2 sm:py-3 rounded-xl text-center font-medium cursor-pointer md:col-span-2 mt-4 text-md md:text-lg md:mt-6 lg:mt-8"
          >
            Delete task
          </button>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {confirm && (
              <div className="flex flex-col bg-white dark:bg-black p-6 border rounded-md w-48 gap-3">
                <h3 className="font-medium text-center">Delete {name}?</h3>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeTask(index);
                      closeEditTask();
                    }}
                    className="bg-black rounded-md py-2 px-5 text-white dark:bg-neutral-300 dark:text-black font-medium"
                  >
                    Yes
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirm(false);
                    }}
                    className="border rounded-md py-2 px-5"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
