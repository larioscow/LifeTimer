import axios from 'axios';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import useMenuStore from '../stores/useMenuStore';

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const { openLogIn, closeAll, isLoginOpen, isRegisterOpen } = useMenuStore();

  const goLogin = async () => {
    closeAll();
    openLogIn();
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3000/protected', {
          withCredentials: true,
        });
        if (res.data) {
          setLoggedIn(true);
          console.log(res.data);
          setUser(res.data.user.username);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      {!isRegisterOpen && !isLoginOpen && (
        <header className="fixed w-full z-30">
          <nav className="flex justify-end px-8 w-full">
            <span
              onClick={goLogin}
              className={clsx(
                'cursor-pointer px-4 py-2 bg-transparent font-medium rounded-md text-white',
                !loggedIn && 'bg-white text-black'
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
