import { useEffect, useState } from "react";
import useEstateStore from "../hooks/useEstateStore";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const { startGetListingById } = useEstateStore();
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

    console.log(listing);
    
    return (
        <main>
            {
                loading && 
                    <p className="text-center mt-5 text-2xl">
                        Loading...
                    </p>
            }
            {
                !loading && listing && 
                <>
                    <h1 className="text-4xl font-bold mb-4">
                        {listing.name}
                    </h1>
                    <Swiper
                        navigation
                    >
                        {
                            listing.imageUrls.map((url, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="h-[500px]"
                                        style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}
                                    ></div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            }
        </main>
    );

};

export default Listing;