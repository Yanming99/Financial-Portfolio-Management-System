// LoginForm.js
import React, { useState } from 'react';

export default function LoginForm({ onResponse }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      onResponse(text);
    } catch (err) {
      onResponse(err.message);
    }
  };

  const handleGoogleLogin = () => {

    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div>
      <form onSubmit={login}>
        <h2>Login</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        /><br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        /><br />
        <button type="submit">Login</button>
      </form>

      <hr />

      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}
