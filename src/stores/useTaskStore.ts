import { create } from 'zustand';
import axios from 'axios';

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
  addTask: (task: Task) => Promise<void>;
  removeTask: (index: number) => Promise<void>;
  updateTask: (index: number, updatedTask: Task) => Promise<void>;
  sortTasks: () => void;
  deleteAllTasks: () => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [
    {
      name: 'Morning Routine',
      startHour: '07:00',
      endHour: '07:15',
    },
    {
      name: 'Exercise',
      startHour: '07:15',
      endHour: '08:30',
    },
    {
      name: 'PAA',
      startHour: '08:30',
      endHour: '11:00',
    },
    {
      name: 'Breakfast',
      startHour: '11:00',
      endHour: '11:30',
    },
    {
      name: 'SIGMA',
      startHour: '11:30',
      endHour: '15:00',
    },
    {
      name: 'Projects',
      startHour: '15:00',
      endHour: '21:00',
    },
    {
      name: 'Morning Routine',
      startHour: '07:00',
      endHour: '07:15',
    },
    {
      name: 'Exercise',
      startHour: '07:15',
      endHour: '08:30',
    },
    {
      name: 'PAA',
      startHour: '08:30',
      endHour: '11:00',
    },
    {
      name: 'Breakfast',
      startHour: '11:00',
      endHour: '11:30',
    },
    {
      name: 'SIGMA',
      startHour: '11:30',
      endHour: '15:00',
    },
    {
      name: 'Projects',
      startHour: '15:00',
      endHour: '21:00',
    },
  ],
  editTask: false,
  startSchedule: '00:00',
  endSchedule: '24:00',

  setTasks: (tasks: Task[]) => set(() => ({ tasks })),

  openEditTask: () => set(() => ({ editTask: true })),
  closeEditTask: () => set(() => ({ editTask: false })),

  addTask: async (task: Task) => {
    const newTasks = [...get().tasks, task];
    set({ tasks: newTasks });
    try {
      await axios.post(
        'https://life-timer-api.larioscow.dev/tasks',
        { tasks: newTasks },
        { withCredentials: true }
      );
      console.log('added: ', task);
    } catch (error) {
      console.error(error);
    }
  },

  removeTask: async (index: number) => {
    const newTasks = get().tasks.filter((_, i) => i !== index);
    set({ tasks: newTasks });
    await axios.post(
      'https://life-timer-api.larioscow.dev/tasks',
      { tasks: newTasks },
      { withCredentials: true }
    );
  },

  updateTask: async (index: number, updatedTask: Task) => {
    const newTasks = get().tasks.map((task, i) =>
      i === index ? updatedTask : task
    );
    set({ tasks: newTasks });
    await axios.post(
      'https://life-timer-api.larioscow.dev/tasks',
      { tasks: newTasks },
      { withCredentials: true }
    );
  },

  sortTasks: async () => {
    const sortedTasks = [...get().tasks].sort((a, b) => {
      const [ah, am] = a.startHour.split(':').map(Number);
      const [bh, bm] = b.startHour.split(':').map(Number);
      return ah !== bh ? ah - bh : am - bm;
    });

    try {
      await axios.post(
        'https://life-timer-api.larioscow.dev/tasks',
        { tasks: sortedTasks },
        { withCredentials: true }
      );
      set({ tasks: sortedTasks });
    } catch (error) {
      console.error('Error saving sorted tasks to server:', error);
    }
  },

  deleteAllTasks: async () => {
    try {
      await axios.post(
        'https://life-timer-api.larioscow.dev/tasks',
        { tasks: [] },
        { withCredentials: true }
      );
      set({ tasks: [] }); // Solo si el servidor responde correctamente
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  },

  fetchTasks: async () => {
    const res = await axios.get('https://life-timer-api.larioscow.dev/tasks', {
      withCredentials: true,
    });
    const parsedTasks = res.data.map((task: Task) => ({
      name: task.name,
      startHour: task.startHour,
      endHour: task.endHour,
    }));
    set({ tasks: parsedTasks });
  },
}));

export default useTaskStore;
