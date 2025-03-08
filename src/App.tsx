import {
  ToggleMenu,
  Tasks,
  EditTasks,
  AddTask,
  ToggleAddTask,
} from './components';
import useMenuStore from './stores/useMenuStore';

const App = () => {
  const { isMenuOpen, isAddTaskOpen } = useMenuStore();
  return (
    <main className="h-[100dvh] flex items-start justify-center py-10">
      {/* {isMenuOpen && <Menu />} */}
      {!isAddTaskOpen && <Tasks />}

      {isAddTaskOpen && <AddTask />}
      <div className="flex flex-col items-center space-y-1.5 absolute bottom-5 right-5">
        {isMenuOpen && <ToggleAddTask />}

        {isMenuOpen && <EditTasks />}
        <ToggleMenu />
      </div>
    </main>
  );
};

export default App;
