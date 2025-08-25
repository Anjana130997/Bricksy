// KEPT: signup redirects to /login after creation
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setErr('');
    const res = signup(form);
    if (!res.ok) setErr(res.error);
    else navigate('/login', { replace: true });
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <div className="card" style={{ maxWidth: 520, margin: 'auto', padding: 24 }}>
        <h2>Create Account</h2>
        {err && <div style={{ color: 'red', marginBottom: 12 }}>{err}</div>}
        <form onSubmit={submit}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={onChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required />
          <button className="btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
