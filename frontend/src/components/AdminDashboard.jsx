/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import api from './api';



// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex space-x-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`px-3 py-1 rounded ${
            currentPage === index 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};


const NotificationDialog = ({ notifications, onClose, onSend, formData, setFormData }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto mb-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-3 border-b">
              <h6 className="font-semibold">{notification.title}</h6>
              <p className="text-gray-600">{notification.message}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Send New Notification</h3>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-2 mb-2 border rounded h-24"
          />
          <button
            onClick={onSend}
            className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

NotificationDialog.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);

  const [sortKey, setSortKey] = useState(''); // Key to sort by
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order: 'asc' or 'desc'
  const [filter, setFilter] = useState(''); // Filter query

  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: ''
  });

  const chartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      label: 'order Status',
      data: [120, 45, 35],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
    }]
  };
  const PieChart = ({ data }) => {
    return (
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    );
  };
  PieChart.propTypes={
    data: PropTypes.number.isRequired
  };
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('role');
    
    if (!isAuthenticated || role !== 'ROLE_ADMIN') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
    
  }, [currentPage]);
  const fetchUsers = async () => {
    try {
      // Use axios.get for the GET request, passing query parameters via `params`
      const response = await api.get('/admin/users', {
        params: {
          page: currentPage,
          size: pageSize,
        },
      });
      
      // Update state with the response data
      setUsers(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1); // Set total pages or default to 1
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  /*const fetchUsers = async () => {
    try {
      // Change to GET method since your controller doesn't have a POST endpoint for fetching users
      const response = await api.get('/api/admin/users', {
        params: {
          page: currentPage,
          size: pageSize
        }
      });
      setUsers(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };*/

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);

    } catch (error) {
      console.log('Error details:', error.response?.data);
    }
  };
  

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSendNotification = async () => {
    try {
      await api.post('/notifications', notificationForm);
      setNotificationForm({ title: '', message: '' });
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}/mark-read`, {
        method: 'PUT',
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  useEffect(() => {
    // Apply filtering and sorting
    let updatedUsers = [...users];

    // Filtering
    if (filter) {
      updatedUsers = updatedUsers.filter((user) =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    }

    // Sorting
    if (sortKey) {
      updatedUsers.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(updatedUsers);
  }, [users, filter, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc')); // Toggle order
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Previous sidebar code remains the same */}
      <div className="fixed w-64 h-screen bg-[#001C30] text-[#64CCC5]">
        <div className="flex flex-col h-full p-4">
          <img src="/img.png" alt="Logo" className="w-16 h-auto mb-8 mx-auto" />
          
          <Link to="/admin/add" className="flex items-center p-3 mb-2 hover:bg-[#176B87] rounded-lg transition-colors">
            <i className="fas fa-user-plus mr-3"></i>
            <span>Add New User</span>
          </Link>

          <Link to="/admin/search" className="flex items-center p-3 mb-2 hover:bg-[#176B87] rounded-lg transition-colors">
            <i className="fas fa-search mr-3"></i>
            <span>Search User</span>
          </Link>

          <Link to="/admin/download/users" className="flex items-center p-3 mb-2 hover:bg-[#176B87] rounded-lg transition-colors">
            <i className="fas fa-download mr-3"></i>
            <span>Download Data</span>
          </Link>
          <Link to="/admin/upload" className="btn btn-primary">
          <i className="fas fa-upload mr-3"></i>
          <span>Upload File</span>
          </Link>
          <Link to="/admin/users" className="nav-link">
          <i className="fas fa-upload mr-3"></i>
          <span>User Management</span></Link>

          

          <Link to= "/files/upload" className="flex items-center p-3 mb-2 hover:bg-[#176B87] rounded-lg transition-colors">
            <i className="fas fa-upload mr-3"></i>
            <span>Upload Data</span>
          </Link>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center p-3 mb-2 hover:bg-[#176B87] rounded-lg transition-colors"
          >
            <i className="fas fa-bell mr-3"></i>
            <span>Notifications</span>
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {notifications.length}
            </span>
          </button>

          <Link to="/logout" className="mt-auto flex items-center p-3 hover:bg-[#176B87] rounded-lg transition-colors">
            <i className="fas fa-sign-out-alt mr-3"></i>
            <span>Logout</span>
          </Link>
        </div>
      </div>

      <div className="ml-64 flex-1 p-8">
        {/* Previous header and chart code remains the same */}
        <header className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Manage Users</h3>
        </header>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
          <h5 className="text-lg font-semibold mb-4 text-center">order Completion Overview</h5>
          <div className="h-[400px]">
            <Doughnut data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }} />
          </div>
        </div>

        <div className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800">Manage Users</h3>
        </header>

        {/* Filter Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded w-full max-w-md"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Username', 'First Name', 'Last Name', 'Email', 'Phone', 'Role'].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.replace(/\s+/g, '').toLowerCase())}
                  >
                    {header}
                    {sortKey === header.replace(/\s+/g, '').toLowerCase() && (
                      <i className={`ml-2 fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                    )}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/admin/users/edit/${user.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-300 hover:bg-yellow-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / pageSize)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    
<div>
        {/* Notifications Dialog */}
        {showNotifications && (
          <NotificationDialog
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onSend={handleSendNotification}
            formData={notificationForm}
            setFormData={setNotificationForm}
          />
        )}
        </div>
         {/* Notifications Section */}
         <div className="mb-4">
            <h5>Notifications</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{notification.message}</td>
                    <td>{new Date(notification.timestamp).toLocaleString()}</td>
                    <td>{notification.read ? 'Read' : 'Unread'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleClearNotifications} className="btn btn-secondary">Clear All Notifications</button>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
