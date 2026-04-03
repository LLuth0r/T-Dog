import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRegistration } from '../context/RegistrationContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    /** Where to redirect if the user hasn't completed registration */
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = '/register',
}) => {
    const { isRegistered } = useRegistration();

    if (!isRegistered) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
