interface props {
  percentage: number;
}

export const Progress = ({ percentage = 0 }: props) => {
  return (
    <div
      className="absolute bottom-0 left-0 h-1 bg-black min-w-1 dark:bg-neutral-300"
      style={{ width: `${percentage}%` }}
    ></div>
  );
};
