/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token'); // Extract token from the URL.

  const [formData, setFormData] = useState({ newPassword: '', confirmNewPassword: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    // Validate the token before allowing password reset form to load
    const validateToken = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/reset-password?token=${token}`);
        if (response.data.message === 'Token is valid.') {
          setIsTokenValid(true);
        } else {
          setError('Invalid or expired token.');
        }
      } catch (error) {
        setError('Token validation failed.');
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate password fields
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.newPassword || !formData.confirmNewPassword) {
      setError('Password fields cannot be empty.');
      return;
    }

    try {
      // Make API request to reset password
      const response = await axios.post('http://localhost:8080/api/reset-password', {
        token,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });
      setMessage(response.data.message || 'Password reset successful!');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.error || 'Password reset failed.');
    }
  };

  return (
    <div className="reset-password-page">
      {isTokenValid ? (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </>
      ) : (
        <p className="error">Invalid or expired token.</p>
      )}
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;

