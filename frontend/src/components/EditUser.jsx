/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUser = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  // Fetch user details when the component mounts or userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/admin/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setMessage('Error fetching user data');
        console.error('Error:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8082/api/admin/users/update', user);
      setMessage('User updated successfully!');
      navigate('/admin');
    } catch (error) {
      setMessage('Error updating user');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Edit User</h2>

          {message && <p className="text-center text-red-500 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {['username', 'password', 'firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  className="form-control"
                  value={user[field]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                className="form-select"
                value={user.role}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="ROLE_USER">Customer</option>
                <option value="ROLE_MANAGER">Manager</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-600 text-black px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

