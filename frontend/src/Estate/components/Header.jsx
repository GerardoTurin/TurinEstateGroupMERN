import { FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import useForm from "../../auth/hooks/useForm";




const Header = () => {
    const [ searchTerm, setSearchTerm ] = useState(''); // Agrega un estado para el campo de búsqueda
    const navigate = useNavigate(); // Obtiene la función de navegación de la URL


    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);  // Crea un objeto URLSearchParams con la búsqueda de la URL
        urlParams.set('searchTerm', searchTerm);  // Actualiza el parámetro de búsqueda

        const searhQuery = urlParams.toString();  // Convierte el objeto URLSearchParams en una cadena de consulta
        navigate(`/search?${searhQuery}`);  // Navega a la URL con la cadena de consulta
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);  // Crea un objeto URLSearchParams con la búsqueda de la URL
        const searchTermFromUrl = urlParams.get('searchTerm');  // Obtiene el parámetro de búsqueda de la URL
        setSearchTerm(searchTermFromUrl || '');  // Actualiza el estado con el parámetro de búsqueda de la URL
    }, [location.search]);  // Ejecuta el efecto cuando cambie la búsqueda de la URL


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

                <form
                    onSubmit={handleSearch} // Agrega la función para manejar la búsqueda
                    className="bg-gray-100 p-3 rounded-lg flex items-center">
                    <input 
                        type="text" 
                        id="search" // Agrega un id único al campo de búsqueda
                        placeholder="Search..." 
                        className="bg-transparent focus:outline-none w-24 sm:w-64"
                        value={searchTerm} // Agrega el valor del estado al campo de búsqueda
                        onChange={(e) => setSearchTerm(e.target.value)} // Agrega la función para actualizar el estado
                    />
                    <button className="text-gray-500">
                        <FaSearch className="text-gray-500" />
                    </button>
                </form>

                <Navbar />
            </div>
        </header>
    )
};

export default Header;