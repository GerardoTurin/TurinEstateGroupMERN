import { useNavigate } from "react-router-dom";
import useEstateStore from "./useEstateStore";
import { useEffect, useState } from "react";

const useSearch = () => {
    const { startGetAllListings } = useEstateStore();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [ listings, setListings ] = useState([]);
    const [ showMore, setShowMore ] = useState(false);
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
            setShowMore(false);

            const searchQuery = urlParams.toString();
            const data = await startGetAllListings(searchQuery);
            console.log(data.allListings);

            if (data.allListings && data.allListings.length > 8 ) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data.allListings || []);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);



    const onInputChange = ( evt ) => {
        const { id, checked, value } = evt.target;
        
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


    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;   // Obtiene el número de listados.
        const startIndex = numberOfListings;     // Establece el índice de inicio en el número de listados.
        const urlParams = new URLSearchParams(location.search);  // Crea un objeto URLSearchParams con la búsqueda de la URL.
        urlParams.set('startIndex', startIndex);    // Establece el parámetro de inicio en el número de listados.
        const searchQuery = urlParams.toString();   // Convierte los parámetros de búsqueda en una cadena de consulta.

        setLoading(true);
        const data = await startGetAllListings(searchQuery);
        setLoading(false);
        if ( data.allListings.length < 9 ) {
            setShowMore(false);
        };
        setListings([...listings, ...data.allListings]);    // Agrega los nuevos listados a la lista existente.


    };



    return {
        loading,
        listings,
        sidebarData,
        showMore,
        setShowMore,
        onInputChange,
        handleSubmit
    };
};

export default useSearch;