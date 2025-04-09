interface Props {
  confirm: boolean;
  setConfirm: (confirm: boolean) => void;
  action: () => void;
  message: string;
}

export const Confirm = ({ confirm, setConfirm, action, message }: Props) => {
  const handleClick = () => {
    setConfirm(false);
    action();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {confirm && (
        <div className="flex flex-col bg-white p-6 border rounded-md w-48 gap-3 text-black dark:bg-black dark:text-white">
          <h3 className="font-medium text-center">{message}</h3>
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              className="bg-black rounded-md py-2 px-5 text-white dark:bg-neutral-300 font-medium dark:text-black"
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
  );
};
