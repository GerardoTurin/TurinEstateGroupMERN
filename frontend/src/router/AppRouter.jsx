import { Route, Routes } from "react-router-dom";
import Home from "../Estate/pages/Home";
import About from "../Estate/pages/About";
import SignIn from "../auth/pages/SignIn";
import SignUp from "../auth/pages/SignUp";
import Profile from "../Estate/pages/Profile";
import Header from "../Estate/components/Header";

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/sign-up" element={ <SignUp /> } />
                <Route path="/sign-in" element={ <SignIn /> } />
                <Route path="/" element={ <Home /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="*" element={ <h1>Not found</h1> } />
            </Routes>
        </>
    )
};

export default AppRouter;