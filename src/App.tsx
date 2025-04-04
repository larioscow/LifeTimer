import { ToggleMenu, Tasks, Menu } from './components';
import useMenuStore from './stores/useMenuStore';

const App = () => {
  const { isMenuOpen } = useMenuStore();
  return (
    <main className="h-[100dvh] flex justify-center py-10 no-scrollbar dark:bg-black">
      {isMenuOpen && <Menu />}
      {!isMenuOpen && <Tasks />}
      <div className="flex flex-col items-center space-y-1.5 absolute bottom-5 right-5">
        <ToggleMenu />
      </div>
    </main>
  );
};

export default App;
