import { Route, Routes } from "react-router-dom";
import Home from "../Estate/pages/Home";
import About from "../Estate/pages/About";
import SignIn from "../auth/pages/SignIn";
import SignUp from "../auth/pages/SignUp";
import PrivateRoute from "../auth/components/PrivateRoute";
import Profile from "../Estate/pages/Profile";
import Header from "../Estate/components/Header";
import CreateListing from "../Estate/pages/CreateListing";
import UpdateListing from "../Estate/pages/UpdateListing";
import Listing from "../Estate/pages/Listing";
import Search from "../Estate/pages/Search";
import Footer from "../Estate/components/Footer";

const AppRouter = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="mb-auto">
                <Routes>
                    <Route path="/signup" element={ <SignUp /> } />
                    <Route path="/signin" element={ <SignIn /> } />
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/search" element={ <Search /> } />
                    <Route path="/listing/:listingId" element={ <Listing /> } />
                    <Route element={ <PrivateRoute /> }>
                        <Route path="/profile" element={ <Profile /> } />
                        <Route path="/createlisting" element={ <CreateListing /> } />
                        <Route path="/editlisting/:listingId" element={ <UpdateListing /> } />
                    </Route>
                    <Route path="*" element={ <h1>Not found</h1> } />
                </Routes>
            </div>
            <Footer />
        </div>
    )
};

export default AppRouter;