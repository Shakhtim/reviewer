import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/admin/index.ts';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return isAuthenticated ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
