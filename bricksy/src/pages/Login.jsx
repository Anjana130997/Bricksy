// UPDATED: after login, redirect back to "from" if present
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './pages.css';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setErr('');
    const res = login(form);
    if (!res.ok) setErr(res.error);
    else navigate(from, { replace: true }); // redirect back to original page
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <div className="card" style={{ maxWidth: 520, margin: 'auto', padding: 24 }}>
        <h2>Login</h2>
        {err && <div style={{ color: 'red', marginBottom: 12 }}>{err}</div>}
        <form onSubmit={submit}>
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required />
          <button className="btn" type="submit">Login</button>
        </form>

        <p style={{ marginTop: 12 }}>
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
