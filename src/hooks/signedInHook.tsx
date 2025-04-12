import axios from 'axios';
import { useState } from 'react';

export const SignedInHook = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const checkLoginStatus = async () => {
    if (user === null) return;
    try {
      const res = await axios.get('http://localhost:3000/protected', {
        withCredentials: true,
      });
      if (res.data) {
        setLoggedIn(true);
        setUser(res.data.user.username);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  return { loggedIn, setLoggedIn, user, setUser, checkLoginStatus };
};
