import { Menu, ToggleMenu, Tasks } from './components';
import useMenuStore from './stores/useMenuStore';

const App = () => {
  const { isMenuOpen } = useMenuStore();
  return (
    <main className="h-[100dvh] flex items-start justify-center py-10">
      {isMenuOpen && <Menu />}
      {!isMenuOpen && <Tasks />}
      <ToggleMenu />
    </main>
  );
};

export default App;
