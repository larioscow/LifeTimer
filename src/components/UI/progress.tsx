interface props {
  percentage: number;
}

export const Progress = ({ percentage = 0 }: props) => {
  return (
    <div
      className="absolute bottom-0 left-0 h-1 bg-black"
      style={{ width: `${percentage}%` }}
    ></div>
  );
};
