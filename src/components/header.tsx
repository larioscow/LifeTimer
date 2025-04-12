import clsx from 'clsx';
import { useEffect } from 'react';
import useMenuStore from '../stores/useMenuStore';
import { Timer } from './timer';
import { SignedInHook } from '../hooks/signedInHook';

export const Header = () => {
  const { checkLoginStatus, setLoggedIn, setUser, loggedIn, user } =
    SignedInHook();
  const {
    openLogIn,
    closeAll,
    isLoginOpen,
    isRegisterOpen,
    isMenuOpen,
    userState,
  } = useMenuStore();

  const goLogin = async () => {
    closeAll();
    openLogIn();
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    console.log(userState);
    if (userState) {
      setLoggedIn(true);
      setUser(userState.username);
    }
    if (userState === null) {
      setLoggedIn(false);
      setUser('');
    }
  }, [userState, setLoggedIn, setUser]);

  return (
    <>
      {!isRegisterOpen && !isLoginOpen && !isMenuOpen && (
        <header className="fixed w-full z-30">
          <nav className="flex justify-between items-center px-8 w-full">
            <Timer
              className="flex-center text-white text-2xl font-bold antialiased"
              type="minutesTimer"
            />
            <span
              onClick={goLogin}
              className={clsx(
                'px-4 py-2 rounded-md font-medium ',
                loggedIn && 'bg-transparent text-white',
                !loggedIn && 'bg-white text-black cursor-pointer'
              )}
            >
              {loggedIn ? 'Hello ' + user : 'Log In'}
            </span>
          </nav>
        </header>
      )}
    </>
  );
};
