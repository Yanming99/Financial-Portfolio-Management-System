import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [responseMsg, setResponseMsg] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📘 React User Auth</h1>
      <RegisterForm onResponse={setResponseMsg} />
      <hr />
      <LoginForm onResponse={setResponseMsg} />
      <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>{responseMsg}</div>
    </div>
  );
}

export default App;
