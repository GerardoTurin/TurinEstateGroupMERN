
const CreateListing = () => {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className='text-center font-bold text-3xl my-10'>
                Create a Listing
            </h1>
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <label htmlFor="name" className="font-semibold">
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded-md" 
                        placeholder="name" 
                    />
                    <label htmlFor="address" className="font-semibold">
                        Address
                    </label>
                    <input 
                        type="text" 
                        name="address" 
                        id="address" 
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded-md" 
                        placeholder="Address" 
                    />
                    
                    <label htmlFor="description" className="font-semibold">
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className="border border-gray-300 p-2 rounded-md" 
                        placeholder="Description" 
                    />
                <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="sale" 
                                id="sale" 
                            />
                            <span className="font-semibold">
                                Sell
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="rent" 
                                id="rent" 
                            />
                            <span className="font-semibold">
                                Rent
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="parking" 
                                id="parking" 
                            />
                            <span className="font-semibold">
                                Parking Spot
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="furnished" 
                                id="furnished" 
                            />
                            <span className="font-semibold">
                                Furnished
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="offer" 
                                id="offer" 
                            />
                            <span className="font-semibold">
                                Offer
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                name="bedrooms" 
                                id="bedrooms" 
                                className="border border-gray-300 p-2 rounded-md" 
                                min="1"
                                max="10" 
                                />
                            <label htmlFor="bedrooms" className="font-semibold">
                                Bedrooms
                            </label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                name="bathrooms" 
                                id="bathrooms" 
                                className="border border-gray-300 p-2 rounded-md" 
                                min="1"
                                max="10" 
                                />
                            <label htmlFor="bathrooms" className="font-semibold">
                                Bathrooms
                            </label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                name="price" 
                                id="price" 
                                className="border border-gray-300 p-2 rounded-md" 
                                min="1"
                                max="10" 
                                />
                            <label htmlFor="price" className="font-semibold flex flex-col items-center">
                                Regular Price
                                <span className="text-sm">
                                    ($ / Month)
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                name="discounted" 
                                id="discounted" 
                                className="border border-gray-300 p-2 rounded-md" 
                                min="1"
                                max="10" 
                                />
                            <label htmlFor="discounted" className="font-semibold flex flex-col items-center">
                                Discounted Price 
                                <span className="text-sm">
                                    ($ / Month)
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images: 
                        <span className="font-normal text-gray-500 ml-2">
                            The first image will be the cover ( max 6 )
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input 
                            type="file" 
                            name="images" 
                            id="images" 
                            className="border border-gray-300 p-3 rounded-md w-full" 
                            accept="image/*"
                            multiple
                            />
                            <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                                Upload
                            </button>
                    </div>
                    <button className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 self-center w-full" type="submit">
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    )
};

export default CreateListing;