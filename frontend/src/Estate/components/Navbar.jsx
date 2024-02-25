import { Link } from "react-router-dom";
import useAuthStore from "../../auth/hooks/useAuthStore";
import { useState } from "react";



const Navbar = () => {
    const { status, user } = useAuthStore();
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return (
        <nav className="relative">
            <button
                onClick={ toggleNav }
                data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className={`${isNavVisible ? 'block' : 'hidden'} md:hidden flex items-center justify-center absolute bg-white shadow-md z-10 w-32 right-0 border border-gray-200 rounded-lg mt-3`}>	
                <ul className="flex flex-col gap-2 p-2 items-center">
                    <Link to="/">
                        <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-3">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-3">
                            About
                        </li>
                    </Link>
                    <Link to={ user && status === 'active' ? '/profile' : '/signin' }>
                        {
                            user && status === 'active' 
                            ?   
                    <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                        <img 
                            src={user.photo}
                            alt={user.name}
                            className="w-7 h-7 rounded-full" 
                            />
                    </li>
                        : <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-3">
                            Sign In
                        </li>
                        }
                    </Link>
                </ul>
            </div>
            <div className='hidden md:block items-center justify-center'>	
                <ul className="flex gap-4 items-center">
                    <Link to="/">
                        <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                            About
                        </li>
                    </Link>
                    <Link to={ user && status === 'active' ? '/profile' : '/signin' }>
                        {
                            user && status === 'active' 
                            ?   
                    <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                        <img 
                            src={user.photo}
                            alt={user.name}
                            className="w-7 h-7 rounded-full" 
                            />
                    </li>
                        : <li className="sm:block text-gray-500 hover:text-gray-900 font-semibold cursor-pointer">
                            Sign In
                        </li>
                        }
                    </Link>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;