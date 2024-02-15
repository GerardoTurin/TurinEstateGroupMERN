import CardListing from "../components/CardListing";
import useSearch from "../hooks/useSearch";


const Search = () => {
    const { loading, listings, sidebarData, showMore, onInputChange, handleSubmit } = useSearch();


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
                <div className="p-7 flex flex-col flex-wrap gap-4">
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
                    {
                        showMore && (
                            <button
                                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 inline-block sm:w-full sm:mx-0 md:w-1/3 md:mx-auto">
                                Show More
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Search;