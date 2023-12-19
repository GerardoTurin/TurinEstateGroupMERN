import { Link } from "react-router-dom";
import useAuthStore from "../../auth/hooks/useAuthStore";



const Navbar = () => {
    const { status, user } = useAuthStore();

    return (
        <nav>
            <ul className="flex gap-4 items-center">
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
                <Link to={ user && status === 'active' ? '/profile' : '/signin' }>
                    {
                        user && status === 'active' 
                        ?   
                        <li className="hidden sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                            <img 
                                    src={user.photo}
                                    alt={user.name}
                                    className="w-7 h-7 rounded-full" 
                                />
                        </li>
                        : <li className="hidden sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                            Sign In
                        </li>
                    }
                </Link>
            </ul>
        </nav>
    )
};

export default Navbar;