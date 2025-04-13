import axios from 'axios';
import useTaskStore from '../stores/useTaskStore';
import type { Task } from './task';

export const IA = () => {
  const { addTask, sortTasks, tasks } = useTaskStore();
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'auto'; // Reset height to auto to calculate new height
    event.target.style.height = `${event.target.scrollHeight}px`; // Set height based on scrollHeight
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('textarea')?.value;
    if (!input) return;
    try {
      const response = await axios.post(
        'http://localhost:5678/webhook/e1090d14-60b0-4958-8718-29df14b636ef',
        { msg: input }
      );
      const fetchedTasks = response.data;
      fetchedTasks.forEach(async (task: Task) => {
        await addTask(task);
      });
    } catch (error) {
      console.error('Error:', error);
    }
    await sortTasks();
  };

  return (
    <>
      {!tasks.length && (
        <section className="w-full flex flex-col justify-center items-center gap-y-16 text-center text-white">
          <div>
            <h1 className="font-bold text-2xl lg:text-3xl">
              Describe your daily routine
            </h1>
            <p className="text-center lg:text-xl">
              Use AI to create a daily routine
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center gap-y-10"
          >
            <textarea
              className="w-full max-w-xl border-card lg:max-w-2xl px-2 resize-none overflow-hidden p-4 max-h-36 overflow-y-auto"
              rows={1}
              onInput={handleInput}
            />
            <button className="cursor-pointer inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Generate
            </button>
          </form>
        </section>
      )}
    </>
  );
};
