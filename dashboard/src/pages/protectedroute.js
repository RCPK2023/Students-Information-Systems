import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedRoutes = () => {
    const { isLoggedIn, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
