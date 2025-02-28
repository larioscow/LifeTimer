import { Menu, ToggleMenu } from './components';

const App = () => {
  return (
    <main className="h-[100dvh] flex items-start justify-center py-10">
      <Menu />
      <ToggleMenu />
    </main>
  );
};

export default App;
