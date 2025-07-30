import React, { useState } from 'react';

export default function AddAssetForm({ onResponse }) {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/assets/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, value, quantity })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      onResponse(`✅RIGHT ${text}`);
    } catch (err) {
      onResponse(`❌WRONG ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Asset</h2>
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Type (e.g., stock, crypto)" required /><br />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name (e.g., TSLA)" required /><br />
      <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Value per unit" required /><br />
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" required /><br />
      <button type="submit">Add Asset</button>
    </form>
  );
}
