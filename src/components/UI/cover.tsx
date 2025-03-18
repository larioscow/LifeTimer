import useTaskStore from '../../stores/useTaskStore';

export const Cover = () => {
  const { closeEditTask } = useTaskStore();
  return (
    <div
      onClick={closeEditTask}
      className="h-screen w-screen absolute z-10 top-0 left-0 bg-black opacity-30"
    ></div>
  );
};
