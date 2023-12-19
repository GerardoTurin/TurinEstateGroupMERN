import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const PrivateRoute = () => {
    const { status, user } = useAuthStore();
    return (
        <>
            {
                user && status === 'active' 
                ? <Outlet />
                : <Navigate to="/signin" />
            }
        </>
    )
};

export default PrivateRoute;