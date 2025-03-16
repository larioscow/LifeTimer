import { useState, useEffect } from 'react';
import useTaskStore from '../stores/useTaskStore'; // Ajusta la ruta según tu estructura de proyecto
import useMenuStore from '../stores/useMenuStore';

export const AddTask = () => {
  const { toggle } = useMenuStore();

  // Obtener la función para añadir tareas del store
  const addTask = useTaskStore((state) => state.addTask);

  // Estado local para el formulario
  const [taskName, setTaskName] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  // Inicializar con la hora actual formateada
  useEffect(() => {
    const currentTime = new Date();
    const formattedHour = currentTime.getHours().toString().padStart(2, '0');
    const formattedMinute = currentTime
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const currentTimeString = `${formattedHour}:${formattedMinute}`;

    setStartHour(currentTimeString);
    // Establecer una hora de finalización predeterminada (1 hora después)
    const endDate = new Date(currentTime);
    endDate.setHours(endDate.getHours() + 1);
    const endHourString = `${endDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    setEndHour(endHourString);
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Añadir la tarea al store
    addTask({
      name: taskName,
      startHour,
      endHour,
    });

    // Limpiar el formulario
    setTaskName('');
    // Mantener la hora actual para la próxima tarea
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
    <div className="flex flex-col space-y-4 border-2 rounded-md p-6 w-full shadow-md bg-white lg:p-8 lg:gap-5">
      <h2 className="text-xl font-bold text-center lg:text-2xl">Add Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
        <div className="flex flex-col">
          <label htmlFor="taskName" className="font-medium mb-1">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
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
              onChange={(e) => setStartHour(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 md:py-3"
              required
            />
          </label>

          <label htmlFor="endHour" className="flex flex-col">
            <span className="font-medium mb-1">To:</span>
            <input
              type="time"
              id="endHour"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 md:py-3"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full md:py-3 bg-black hover:bg-neutral-900 text-white font-medium py-2 px-4 rounded-md transition duration-150"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
