import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Registration() {
  // One state object for the whole form
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');


  const navigate = useNavigate();

  // Update form fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({...f,[name]: value})); // update only the changed field

  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('register/', form);
    setSuccessMessage('Registration successful!');
    setTimeout(() => {
      navigate('/');
    }, 2000); // Delay navigation to show message
  } catch (error) {
    console.error(error);
    setSuccessMessage('Registation failled')
    alert('Registration failed');
  }
};


  return (
    <div>
      <h2>Register here</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

    </div>
  );
}

export default Registration;
