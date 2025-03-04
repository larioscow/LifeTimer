import { Menu, ToggleMenu, Tasks } from './components';
import useMenuStore from './stores/useMenuStore';

const App = () => {
  const { isOpen } = useMenuStore();
  return (
    <main className="h-[100dvh] flex items-start justify-center py-10">
      {!isOpen && <Tasks />}
      <Menu />
      <ToggleMenu />
    </main>
  );
};

export default App;
