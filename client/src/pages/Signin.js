import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signin', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      const message = err?.response?.data?.error || 'Signin failed. Please try again.';
      console.error('Signin error:', err);
      alert(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
  );
}
