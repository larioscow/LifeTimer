import { Timer, Task } from './components';
import { Card } from './components/UI/card';

const App = () => {
  return (
    <main className="h-screen flex justify-center items-center bg-amber-100">
      <div className="flex flex-col items space-y-2">
        <Card>
          <Timer className="text-5xl font-bold antialiased font-dm" />
        </Card>
        <Task name="Do the dishes" startHour="9:00" endHour="11:00"></Task>
      </div>
    </main>
  );
};

export default App;
