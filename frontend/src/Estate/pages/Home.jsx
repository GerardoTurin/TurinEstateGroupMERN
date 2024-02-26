import { Link } from "react-router-dom";
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import CardListing from "../components/CardListing";
import useHomePage from "../hooks/useHomePage";



const Home = () => {
    const { offerListings, saleListings, rentListings } = useHomePage();
    SwiperCore.use([Navigation]);


    return (
        <div className="">
            {/* Top */}
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-slate-700 text-3xl lg:text-6xl font-bold">
                    Find your next <span className="text-slate-500">perfect</span>
                    <br />
                    place with ease
                </h1>
                <div className="">
                    <p className="text-gray-500 text-xs sm:text-sm">
                        Sahnand Estate is the best place to find your next perfect place to live.
                        <br />
                        We have a wide range of properties for you to choose from.
                    </p>
                </div>
                <Link
                    to="/search"
                    >
                    <button className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600">
                        Get Started
                    </button>
                </Link>
            </div>
            {/* SWIPER */}
            <Swiper navigation>
                {
                    offerListings && offerListings.length > 0 && 
                        offerListings.map((listing) => (
                            <SwiperSlide key={listing._id}>
                                <div
                                    style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize: 'cover' }}
                                    className="h-[500px]">
                                </div>
                            </SwiperSlide>
                        )
                    )
                }
            </Swiper>

            {/* Listing Results */}
            <div className=" max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {
                    offerListings && offerListings.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Resent Offers
                                </h2>
                                <Link
                                    className="text-slate-500 text-s hover:underline"
                                    to="/search?offer=true">
                                    Show more offers
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    offerListings.map((listing) => (
                                        <CardListing key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                    
                }
                {
                    rentListings && rentListings.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Resent place to rent
                                </h2>
                                <Link
                                    className="text-slate-500 text-s hover:underline"
                                    to="/search?type=rent">
                                    Show more places to rent
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    rentListings.map((listing) => (
                                        <CardListing key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                    
                }
                {
                    saleListings && saleListings.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <div className="my-3">
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Resent places for sale
                                </h2>
                                <Link
                                    className="text-slate-500 text-s hover:underline"
                                    to="/search?type=sale">
                                    Show more places for sale
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {
                                    saleListings.map((listing) => (
                                        <CardListing key={listing._id} listing={listing} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                    
                }
            </div>
        </div>
    )
};

export default Home;