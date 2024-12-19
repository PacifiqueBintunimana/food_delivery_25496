import api from './api.js';


export const checkAuth = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return token && role === 'ROLE_ADMIN';
};

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        if (response.data) {
            localStorage.setItem('token', 'dummy-token');
            localStorage.setItem('role', response.data);
        }
        return response;
    },
    
    register: (userData) => api.post('/register', userData),
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return api.post('/logout');
    },
    
    forgotPassword: (email) => api.post('/auth/forgotPassword', null, {
        params: {
            email: email
        }
        //timeout: 15000
    }),
    
    resetPassword: (token, newPassword) => 
        api.post(`/api/reset-Password/$ {token}`, {
            newPassword: newPassword,
            confirmNewPassword: newPassword
        }),
    
    getNotifications: () => api.get('/notifications/user/unread'),
    
    markNotificationsAsRead: () => 
        api.put('/notifications/user/mark-all-as-read'),

    // New admin-specific methods
    getUsers: (page, size) => 
        api.get('/admin/users', {
            params: { page, size }
        }),

    deleteUser: (userId) => 
        api.delete(`/admin/users/${userId}`),

    updateUser: (userId, userData) => 
        api.put(`/admin/users/${userId}`, userData),

    addUser: (userData) => 
        api.post('/admin/users', userData),

    userUpload: (userData) => 
        api.post('/admin/upload/users', userData),
    FileUpload: (userData) => 
        api.post('/admin/files/upload', userData),

    downloadUsers: (userData) => 
        api.get('/admin/download/users', userData),

    searchUsers: (query) => 
        api.get('/admin/search/results', {
            params: { query }
        })
};

export default authService;
