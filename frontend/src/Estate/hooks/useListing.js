import { useEffect, useState } from 'react'
import useEstateStore from './useEstateStore';
import { useParams } from 'react-router-dom';

const useListing = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const { startGetListingById, user } = useEstateStore();
    const params = useParams();

    useEffect(() => {
        const { listingId } = params;

        const getListing = async () => {
            setLoading(true);
            const data = await startGetListingById(listingId);
            setListing(data.listing);
            setLoading(false);
        };
        getListing();
    }, [params]);   // eslint-disable-line react-hooks/exhaustive-deps


    return {
        listing,
        loading,
        copied,
        setCopied,
        contact,
        setContact,
        user
    };
};

export default useListing;