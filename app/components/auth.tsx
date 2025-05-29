"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Signed up! You can log in immediately.");
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-green-500 rounded text-white"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 rounded text-white"
        >
          Sign In
        </button>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 rounded text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
