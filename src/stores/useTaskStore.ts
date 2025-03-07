import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Definición del tipo Task
interface Task {
  name: string;
  startHour: string;
  endHour: string;
}

// Definición del store
interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  updateTask: (index: number, updatedTask: Task) => void;
  sortTasks: () => void;
}

// Creación del store con Zustand y persistencia
const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      // Estado inicial con las tareas proporcionadas
      tasks: [],

      // Método para añadir una tarea
      addTask: (task: Task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      // Método para eliminar una tarea por su índice
      removeTask: (index: number) =>
        set((state) => ({
          tasks: state.tasks.filter((_, i) => i !== index),
        })),

      // Método para actualizar una tarea existente
      updateTask: (index: number, updatedTask: Task) =>
        set((state) => ({
          tasks: state.tasks.map((task, i) =>
            i === index ? updatedTask : task
          ),
        })),

      // Método para ordenar tareas por hora de inicio
      sortTasks: () =>
        set((state) => ({
          tasks: [...state.tasks].sort((a, b) => {
            // Convertir las horas de inicio a valores comparables
            const timeA = a.startHour.split(':').map(Number);
            const timeB = b.startHour.split(':').map(Number);

            // Comparar las horas
            if (timeA[0] !== timeB[0]) {
              return timeA[0] - timeB[0];
            }

            // Si las horas son iguales, comparar los minutos
            return timeA[1] - timeB[1];
          }),
        })),
    }),
    {
      name: 'tasks-storage', // nombre único para el almacenamiento
      storage: createJSONStorage(() => localStorage), // uso de localStorage
    }
  )
);

export default useTaskStore;
