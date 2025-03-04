import { Menu, ToggleMenu, Tasks } from './components';

const App = () => {
  return (
    <main className="h-[100dvh] flex items-start justify-center py-10">
      <Tasks />
      <Menu />
      <ToggleMenu />
    </main>
  );
};

export default App;
