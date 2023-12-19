import { Route, Routes } from "react-router-dom";
import Home from "../Estate/pages/Home";
import About from "../Estate/pages/About";
import SignIn from "../auth/pages/SignIn";
import SignUp from "../auth/pages/SignUp";
import PrivateRoute from "../auth/components/PrivateRoute";
import Profile from "../Estate/pages/Profile";
import Header from "../Estate/components/Header";

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/signup" element={ <SignUp /> } />
                <Route path="/signin" element={ <SignIn /> } />
                <Route path="/" element={ <Home /> } />
                <Route path="/about" element={ <About /> } />
                <Route element={ <PrivateRoute /> }>
                    <Route path="/profile" element={ <Profile /> } />
                </Route>
                <Route path="*" element={ <h1>Not found</h1> } />
            </Routes>
        </>
    )
};

export default AppRouter;