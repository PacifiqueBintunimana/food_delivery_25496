import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const userRole = localStorage.getItem('userRole');
    const isAdmin = userRole === 'ROLE_ADMIN';

    return isAdmin ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;
