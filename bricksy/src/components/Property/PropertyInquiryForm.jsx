// RENAMED: PropertyInquiryForm (consistent). Uses useAuth/useMessages and navigates to login if needed
import React, { useState } from 'react';
import './PropertyInquiryForm.css';
import { useMessages } from '../../context/MessagesContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function PropertyInquiryForm({ property }) {
  const { sendMessage, simulateOwnerReply } = useMessages();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [ok, setOk] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const validEmail = (v) => /.+@.+\..+/.test(v);
  const validPhone = (v) => v.trim().length >= 8;

  const submit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/property/${property.id}` } } });
      return;
    }
    if (!form.name || !validEmail(form.email) || !validPhone(form.phone)) {
      return setOk('Please fill name, valid email & phone');
    }
    sendMessage(property.id, `${form.name}: ${form.message}`, 'user');
    simulateOwnerReply(property.id);
    setOk('Thank you! Your inquiry has been sent.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="card inquiry">
      <h3>Contact Agent</h3>
      {property?.agent && (
        <p>
          <strong>{property.agent.name}</strong>
          <br />
          {property.agent.phone}
          <br />
          {property.agent.email}
        </p>
      )}
      <form onSubmit={submit} className="form">
        <input name="name" placeholder="Your Name" value={form.name} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
        <textarea name="message" placeholder="I am interested in this property..." value={form.message} onChange={onChange} rows={4} />
        <button className="btn" type="submit" aria-disabled={!isAuthenticated}>Send Message</button>
        {ok && <div className="note">{ok}</div>}
      </form>
    </div>
  );
}
