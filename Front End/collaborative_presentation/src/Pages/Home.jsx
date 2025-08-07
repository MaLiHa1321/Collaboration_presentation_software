import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    localStorage.setItem('nickname', nickname.trim());
    navigate('/presentations');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Enter your nickname</h1>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
