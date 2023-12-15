import { FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";




const Header = () => {
    return (
        <header className="bg-gray-300 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-red-500">
                            Turin
                        </span>
                        <span className="text-slate-700">
                            EstateGroup
                        </span>
                    </h1>
                </Link>

                <form className="bg-gray-100 p-3 rounded-lg flex items-center">
                    <input 
                        type="text" 
                        id="search" // Agrega un id único al campo de búsqueda
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                        placeholder="Search..." 
                    />
                    <FaSearch className="text-gray-500" />
                </form>

                <Navbar />
            </div>
        </header>
    )
};

export default Header;