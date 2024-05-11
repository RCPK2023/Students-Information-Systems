import { Outlet, Navigate, Route     } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedRoutes = ({children, allowedRoles = [], ...rest}) => {

    const userType = localStorage.getItem("type");

    const { isLoggedIn, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if(allowedRoles.includes(userType) && isLoggedIn){
        return children;
    }else if(!allowedRoles.includes(userType) && isLoggedIn){
        return <Navigate to="/" />;
    }else{
        return <Navigate to="/login" />;
    }
    
    
 
};

export default ProtectedRoutes;

   // if(isLoggedIn && userType === "User"){
    //     return <Outlet /> 
    // }else if(isLoggedIn && userType === "Student"){
    //     return <Outlet /> 
    // }else{
    //     return <Navigate to="/login" />
    // }

    // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;