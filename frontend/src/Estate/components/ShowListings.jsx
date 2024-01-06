import { useState } from "react";
import useEstateStore from "../hooks/useEstateStore";
import { Link } from "react-router-dom";

const ShowListings = () => {
    const { user, startGetListingsUser, startDeleteListing } = useEstateStore();
    const [listings, setListings] = useState([]);
    const { _id } = user;

    const handleShowListings = async () => {
        try {
            const data = await startGetListingsUser(_id);
            setListings(data.listings);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(listings);
    

    const handleDeleteListing = async (id) => {
        try {
            await startDeleteListing(id);
            const data = await startGetListingsUser(_id);
            setListings(data.listings);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <button
                onClick={ handleShowListings } 
                className="bg-slate-400 text-white rounded-md p-3 w-full">
                Show Listings
            </button>

            <div className="flex flex-col">
                {
                    listings && listings.length > 0 &&
                    <div className="flex flex-col gap-4">
                        <h2 className=" text-center text-2xl font-semibold flex-1 my-10">
                            Your Listings
                        </h2>
                        {
                            listings.map(listing => (
                                <div key={ listing._id } className="flex border border-gray-300 rounded-md p-3 justify-between items-center gap-4">
                                    <Link to={ `/listings/${ listing._id }` }>
                                        <img
                                            src={ listing.imageUrls[0] }
                                            alt={ listing.name }
                                            className="w-16 h-16 rounded-md object-contain"
                                        />
                                    </Link>
                                    <Link 
                                        className="text-xl font-semibold flex-1 hover:underline cursor-pointer truncate"
                                        to={ `/listings/${ listing._id }` }>
                                        <p>
                                            { listing.name }
                                        </p>
                                    </Link>
                                    <div className="flex flex-col items-center gap-3">
                                        <button className=" bg-slate-500 text-white rounded-md p-3 w-full">
                                            Edit
                                        </button>
                                        <button
                                            onClick={ () => handleDeleteListing(listing._id) }
                                            className=" bg-red-500 text-white rounded-md p-3 w-full">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
    
        </>
    )
};

export default ShowListings;