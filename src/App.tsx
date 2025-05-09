import { ToggleMenu, Tasks, Menu, Login, Header } from './components';
import { Register } from './components/register';
import useMenuStore from './stores/useMenuStore';
import { IA } from './components/IA';

const App = () => {
  const { isMenuOpen, isLoginOpen, isRegisterOpen } = useMenuStore();
  const concordance = {
    menu: [isMenuOpen, <Menu />],
    login: [isLoginOpen, <Login />],
    register: [isRegisterOpen, <Register />],
  };
  return (
    <main className="min-h-[100dvh] flex justify-center py-10 no-scrollbar bg-black">
      <Header />
      <div className="w-full flex justify-center items-center">
        {concordance.menu[0] && concordance.menu[1]}
        {concordance.login[0] && concordance.login[1]}
        {concordance.register[0] && concordance.register[1]}
        {!isMenuOpen && !isLoginOpen && !isRegisterOpen && <Tasks />}
        {!isMenuOpen && !isLoginOpen && !isRegisterOpen && <IA />}
      </div>
      <div className="flex flex-col items-center space-y-1.5 absolute bottom-5 right-5">
        {!isLoginOpen && !isRegisterOpen && <ToggleMenu />}
      </div>
    </main>
  );
};

export default App;
