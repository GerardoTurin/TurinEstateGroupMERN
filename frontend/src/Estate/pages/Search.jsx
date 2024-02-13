import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEstateStore from "../hooks/useEstateStore";
import CardListing from "../components/CardListing";




const Search = () => {
    const { startGetAllListings } = useEstateStore();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ listings, setListings ] = useState([]);
    const [ sidebarData, setSidebarData ] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });



    useEffect(() => {
        const urlParams = new URLSearchParams(location.search); // Crea un objeto URLSearchParams con la búsqueda de la URL
        const searchTerm = urlParams.get('searchTerm') || '';   // Obtiene el parámetro de búsqueda de la URL.
        const type = urlParams.get('type') || 'all';
        const parking = urlParams.get('parking') === 'true' || false;
        const furnished = urlParams.get('furnished') === 'true' || false;
        const offer = urlParams.get('offer') === 'true' || false;
        const sort = urlParams.get('sort') || 'created_at';
        const order = urlParams.get('order') || 'desc';

        setSidebarData({
            searchTerm,
            type,
            parking,
            furnished,
            offer,
            sort,
            order
        });


        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const data = await startGetAllListings(searchQuery);
            console.log(data.allListings);
            setListings(data.allListings);
            setLoading(false);

        };
        fetchListings();

    }, [location.search]);



    const onInputChange = ( evt ) => {
        const { id, type, checked, value } = evt.target;
        
        if ( id === 'all' || id === 'rent' || id === 'sale' ) { //
            setSidebarData({
                ...sidebarData,
                type: id
            }); 
        };

        if ( id === 'searchTerm' ) {
            setSidebarData({
                ...sidebarData,
                searchTerm: value
            });
        };

        if ( id === 'offer' || id === 'parking' || id === 'furnished' ) {
            setSidebarData({
                ...sidebarData,
                [id]: checked || checked === 'true' ? true : false
            });
        };

        if ( id === 'sort_order' ) {
            const [ sort, order ] = value.split('_');   // Divide el valor del campo de selección en dos partes.
            setSidebarData({
                ...sidebarData,
                sort: sort || 'created_at',
                order: order || 'desc'
            });
        };
    };


    const handleSubmit = ( evt ) => {
        evt.preventDefault();
        const urlParams = new URLSearchParams();
        const { searchTerm, type, parking, furnished, offer, sort, order } = sidebarData;
        urlParams.append('searchTerm', searchTerm);
        urlParams.append('type', type);
        urlParams.append('parking', parking);
        urlParams.append('furnished', furnished);
        urlParams.append('offer', offer);
        urlParams.append('sort', sort);
        urlParams.append('order', order);

        const searchQuery = urlParams.toString();   // Convierte los parámetros de búsqueda en una cadena de consulta.
        navigate(`/search?${searchQuery}`);
    };


    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">

                <form 
                    onSubmit={ handleSubmit }
                    className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input type="text" 
                            id="searchTerm" 
                            placeholder="Search..." 
                            className="border-2 rounded-lg p-3 w-full"
                            value={ sidebarData.searchTerm }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className="font-semibold">
                            Type:
                        </label>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="all" 
                                onChange={ onInputChange }
                                checked={ sidebarData.type === 'all' }
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="rent"
                                onChange={ onInputChange }
                                checked={ sidebarData.type === 'rent' }
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="sale"
                                onChange={ onInputChange }
                                checked={ sidebarData.type === 'sale' }
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="offer"
                                onChange={ onInputChange }
                                checked={ sidebarData.offer }
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className="font-semibold">
                            Amenities:
                        </label>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="parking"
                                onChange={ onInputChange }
                                checked={ sidebarData.parking }
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                id="furnished"
                                onChange={ onInputChange }
                                checked={ sidebarData.furnished }
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">
                            Sort:
                        </label>
                        <select
                            className="border-2 rounded-lg p-3"
                            id="sort_order"
                            onChange={ onInputChange }
                            defaultValue={ 'created_at_desc' }
                            >
                            <option value="regularPrice_desc">
                                Price high to low
                            </option>
                            <option value="regularPrice_asc">
                                Price low to high
                            </option>
                            <option value="created_at_desc">
                                Latest
                            </option>
                            <option value="created_at_asc">
                                Oldest
                            </option>
                        </select>
                    </div>

                    <button
                        className="bg-slate-500 text-white p-3 rounded-lg hover:bg-slate-600">
                        Search
                    </button>
                </form>

            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
                    Results:
                </h1>
                <div className="p-7 flex flex-wrap gap-4">
                    { !loading && listings.length === 0 && (
                        <h2 className="text-2xl font-semibold text-slate-700">
                            No listing found
                        </h2>
                    ) }
                    { loading && (
                        <h2 className="text-2xl font-semibold text-slate-700 text-center w-full">
                            Loading...
                        </h2>
                    ) }
                    { !loading && listings.length > 0 && (
                        listings.map(( listing ) => (
                            <CardListing key={ listing._id } listing={ listing } />
                        ))
                    ) }
                </div>
            </div>
        </div>
    )
};

export default Search;