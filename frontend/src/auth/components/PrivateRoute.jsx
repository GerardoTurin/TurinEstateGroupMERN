import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const PrivateRoute = () => {
    const { user } = useAuthStore();
    return (
        <>
            {
                user 
                ? <Outlet />
                : <Navigate to="/signin" />
            }
        </>
    )
};

export default PrivateRoute;