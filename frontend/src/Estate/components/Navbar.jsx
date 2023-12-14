import { Link } from "react-router-dom";



const Navbar = () => {
    return (
        <nav>
            <ul className="flex gap-4">
                <Link to="/">
                    <li className="hidden sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                        Home
                    </li>
                </Link>
                <Link to="/about">
                    <li className="hidden sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                        About
                    </li>
                </Link>
                <Link to="/signin">
                    <li className=" text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                        Sign In
                    </li>
                </Link>
            </ul>
        </nav>
    )
};

export default Navbar;