import axios from 'axios';
import { useState } from 'react';
import useMenuStore from '../stores/useMenuStore';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { openLogIn, closeAll } = useMenuStore();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/register', {
        username: username,
        password: password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    handleRegister();
  };

  const goLogIn = (e: React.MouseEvent) => {
    e.preventDefault();
    closeAll();
    openLogIn();
  };

  return (
    <div className="flex flex-col w-5/6 md:max-w-4xl space-y-10 items-center dark:bg-black dark:text-white">
      <h2 className="text-3xl font-bold">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
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
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-lg font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <button
          type="submit"
          className="flex items-center justify-center space-x-2 p-3 font-medium bg-white text-black rounded-md cursor-pointer"
        >
          <span>Register</span>
        </button>
        <span
          onClick={goLogIn}
          className="text-neutral-500 font-medium hover:underline hover:text-neutral-400 cursor-pointer"
        >
          Already have an account? Login
        </span>
      </form>
    </div>
  );
};
