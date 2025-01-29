'use client';

import axios from '@/lib/axios';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("/api/auth/login", {
      username, password
    }).then(res => {
      console.log(res)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191f29]">
      <div className=" bg-[#0F1215] px-8 py-12 rounded-3xl shadow-lg w-96 h-[500px]">
        <h2 className="text-white text-xl mb-28">Login</h2>
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
          <span className="self-end text-sm">
            Belum punya akun ?
            <Link className="text-blue-400" href="/register"> Daftar</Link>
          </span>
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
