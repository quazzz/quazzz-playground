"use client";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Page() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuth();
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: pass }),
        credentials: "include",
      });
      const data = await res.json();
      const role = data.role;
      login({ role: role });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Login
        </h1>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="text-black w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Username"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            className="text-black w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
          />
          <button
            onClick={handleSubmit}
            className="cursor-pointer w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
