import { useEffect, useState } from "react";
import useEstateStore from "./useEstateStore";

const useHomePage = () => {
    const { startGetAllListings } = useEstateStore();
    const [ offerListings, setOfferListings ] = useState([]);
    const [ saleListings, setSaleListings ] = useState([]);
    const [ rentListings, setRentListings ] = useState([]);
    

    useEffect(() => {
        const fetchOfferListings = async () => {
            try{
                const searchQuery = 'offer=true&limit=4';
                const data = await startGetAllListings(searchQuery);
                setOfferListings(data.allListings || []);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };


        const fetchRentListings = async () => {
            try {
                const searchQuery = 'type=rent&limit=4';
                const data = await startGetAllListings(searchQuery);
                setRentListings(data.allListings || []);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };
        
        const fetchSaleListings = async () => {
            try {
                const searchQuery = 'type=sale&limit=4';
                const data = await startGetAllListings(searchQuery);
                setSaleListings(data.allListings || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);


    return { 
            offerListings, 
            saleListings, 
            rentListings };
};

export default useHomePage;