import React, { useState } from 'react';

export default function RegisterForm({ onResponse }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/register', {
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

  return (
    <form onSubmit={register}>
      <h2>Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required /><br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required /><br />
      <button type="submit">Register</button>
    </form>
  );
}
