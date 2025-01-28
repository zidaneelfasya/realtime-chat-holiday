'use client';

import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1625]">
      <div className=" bg-[#0F1215] px-8 py-12 rounded-xl shadow-lg w-96 h-[500px]">
        <h2 className="text-white text-xl mb-28">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-gray-400">Username</label>
          <input 
            type="text" 
            className="bg-transparent border-b border-gray-400 text-white focus:outline-none mb-4" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-gray-400">Password</label>
          <input 
            type="password" 
            className="bg-transparent border-b border-gray-400 text-white focus:outline-none mb-4" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            className="border-[1px] rounded-md mt-24 px-4 py-2 text-white border-white text-center outline-none transition-all duration-200 ease-out hover:bg-white hover:text-black hover:duration-300 self-end"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
