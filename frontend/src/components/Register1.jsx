// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

/*

const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8082/api/register', formData);
      if (response.status === 200) {
        setFormData({ username: '', email: '', password: '', role: '' });
        setSuccessMessage('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirects after 2 seconds
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #6a11cb, #2575fc)' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          >
            <option value="">Select Role</option>
            <option value="ROLE_USER">customer</option>
            <option value="ROLE_MANAGER">manager</option>
            <option value="ROLE_ADMIN">Admin</option>

            
          </select>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '0.5rem', backgroundColor: '#6a11cb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#6a11cb', textDecoration: 'none' }}>Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register1;

const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone:'',
    firstname: '',
    lastname: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8082/api/register', formData);
      if (response.status === 200) {
        setFormData({ username: '', email: '', password: '', role: '' });
        setSuccessMessage('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirects after 2 seconds
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333333' }}>Register</h1>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#333333',
              marginBottom: '1rem',
            }}
          >
            <option value="">Select Role</option>
            <option value="ROLE_USER">Customer</option>
            <option value="ROLE_MANAGER">Manager</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green', fontSize: '14px' }}>{successMessage}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link
            to="/login"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register1;
*/
const Register1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8082/api/register', formData);
      if (response.status === 200) {
        setFormData({
          username: '',
          email: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          password: '',
          role: '',
        });
        setSuccessMessage('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5, #ffffff)',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333333' }}>Register</h1>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="PhoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '16px',
                color: '#333333',
              }}
            />
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              fontSize: '16px',
              color: '#333333',
              marginBottom: '1rem',
            }}
          >
            <option value="">Select Role</option>
            <option value="ROLE_USER">Customer</option>
            <option value="ROLE_MANAGER">Manager</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
          {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green', fontSize: '14px' }}>{successMessage}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#007bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Register
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link
            to="/login"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register1;
