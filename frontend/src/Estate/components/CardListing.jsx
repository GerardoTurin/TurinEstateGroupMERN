import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const CardListing = ({ listing }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px]">
            <Link to={`/listing/${listing._id}`}>
                <img
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                    src={listing.imageUrls[0]} 
                    alt={listing.name} />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">
                        {listing.name}
                    </p>
                    <div className="flex gap-1">
                        <MdLocationOn  className="h-4 w-4 text-green-700"/>
                        <p className="text-sm font-semibold text-gray-500 truncate w-full">
                            {listing.address}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {listing.description}
                    </p>
                    <p className="mt-2 font-semibold text-slate-500">
                        $
                        {
                            listing.offer 
                                ? listing.discountPrice.toLocaleString('en-US') 
                                : listing.regularPrice.toLocaleString('en-US')
                        }
                        { listing.type === 'rent' && ' / month' }
                    </p>
                    <div className="text-slate-700 flex gap-2">
                        <div className="font-bold text-sm">
                            {
                                listing.bedrooms > 1 
                                    ? `${listing.bedrooms} Beds`
                                    : `${listing.bedrooms} Bed`
                            }
                        </div>
                        <div className="font-bold text-sm">
                            {
                                listing.bathrooms > 1 
                                    ? `${listing.bathrooms} Baths`
                                    : `${listing.bathrooms} Bath`
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardListing;