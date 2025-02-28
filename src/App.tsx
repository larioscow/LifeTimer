import { Timer } from './components';
import { Card } from './components/UI/card';

const App = () => {
  return (
    <main className="h-screen flex items-start justify-center py-10 bg-amber-100 text-amber-950">
      <div className="flex flex-col w-2/3 space-y-2 ">
        <Card>
          <Timer className="flex-center text-5xl font-bold antialiased font-dm" />
        </Card>
        <Card>
          <h2>Tasks</h2>
        </Card>
        <Card>
          <h2>Pomodoro</h2>
        </Card>
      </div>
    </main>
  );
};

export default App;
