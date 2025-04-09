import { IoLogIn } from 'react-icons/io5';
import { useState } from 'react';
import useMenuStore from '../stores/useMenuStore';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const { openRegister, closeAll } = useMenuStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User:', user, 'Password:', password);
    // Add your login logic here
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAll();
    openRegister();
  };

  return (
    <div className="flex flex-col w-5/6 md:max-w-4xl space-y-10 items-center dark:bg-black dark:text-white">
      <h2 className="text-3xl font-bold">Log In</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="user" className="text-lg font-medium">
            Username
          </label>
          <input
            type="user"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="p-2 border border-gray-300 rounded-md "
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md "
            required
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center space-x-2 p-3 font-medium bg-white text-black rounded-md cursor-pointer"
        >
          <IoLogIn />
          <span>Log In</span>
        </button>
        <span
          onClick={handleRegister}
          className="text-neutral-500 font-medium hover:underline hover:text-neutral-400 cursor-pointer"
        >
          Don't have an account? Register
        </span>
      </form>
    </div>
  );
};
