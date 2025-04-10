import { create } from 'zustand';

interface Task {
  name: string;
  startHour: string;
  endHour: string;
}

interface TaskStore {
  tasks: Task[];
  editTask: boolean;
  startSchedule: string;
  endSchedule: string;
  setTasks: (tasks: Task[]) => void;
  openEditTask: () => void;
  closeEditTask: () => void;
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  updateTask: (index: number, updatedTask: Task) => void;
  sortTasks: () => void;
  deleteAllTasks: () => void; // New function to delete all tasks
}

const useTaskStore = create<TaskStore>()((set) => ({
  tasks: [],
  editTask: false,
  startSchedule: '00:00',
  endSchedule: '24:00',
  setTasks: (tasks: Task[]) => set(() => ({ tasks })),
  openEditTask: () => set((state) => ({ editTask: (state.editTask = true) })),

  closeEditTask: () => set((state) => ({ editTask: (state.editTask = false) })),

  addTask: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  removeTask: (index: number) =>
    set((state) => ({
      tasks: state.tasks.filter((_, i) => i !== index),
    })),

  updateTask: (index: number, updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task, i) => (i === index ? updatedTask : task)),
    })),

  sortTasks: () =>
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) => {
        const timeA = a.startHour.split(':').map(Number);
        const timeB = b.startHour.split(':').map(Number);

        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }

        return timeA[1] - timeB[1];
      }),
    })),

  // New function to delete all tasks at once
  deleteAllTasks: () =>
    set(() => ({
      tasks: [],
    })),
}));

export default useTaskStore;
