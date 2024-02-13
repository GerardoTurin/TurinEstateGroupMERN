import useUpdateListing from "../hooks/useUpdateListing";

const UpdateListing = () => {
    const { 
        imageErrorMsg,
        isLoading,
        formData,
        onInputChange,
        handleFileChange,
        handleImageSubmit,
        handleRemoveImage,
        handleSubmit
    } = useUpdateListing();
    


    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className='text-center font-bold text-3xl my-10'>
                Update Listing
            </h1>
            <form
                onSubmit={ handleSubmit } 
                className="flex flex-col sm:flex-row gap-4"
                >
                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="name" className="font-semibold">
                        Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        autoComplete="off"
                        className="border border-gray-300 p-2 rounded-md" 
                        onChange={ onInputChange }
                        value={ formData.name }
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
                        onChange={ onInputChange }
                        value={ formData.address }
                    />
                    
                    <label htmlFor="description" className="font-semibold">
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className="border border-gray-300 p-2 rounded-md" 
                        onChange={ onInputChange }
                        value={ formData.description }
                    />
                <div className="flex gap-6 flex-wrap mt-3">
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox" 
                                name="sale" 
                                id="sale" 
                                onChange={ onInputChange }
                                checked={ formData.type === 'sale' }
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
                                onChange={ onInputChange }
                                checked={ formData.type === 'rent' }
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
                                onChange={ onInputChange }
                                checked={ formData.parking }
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
                                onChange={ onInputChange }
                                checked={ formData.furnished }
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
                                onChange={ onInputChange }
                                checked={ formData.offer }
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
                                onChange={ onInputChange }
                                value={ formData.bedrooms }
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
                                onChange={ onInputChange }
                                value={ formData.bathrooms }
                                />
                            <label htmlFor="bathrooms" className="font-semibold">
                                Bathrooms
                            </label>
                        </div>
                        <div className="flex items-center gap-4">
                            <input 
                                type="number" 
                                name="regularPrice" 
                                id="regularPrice" 
                                className="border border-gray-300 p-2 rounded-md" 
                                min="1000"
                                max="100000"
                                onChange={ onInputChange }
                                value={ formData.regularPrice }
                                />
                            <label htmlFor="regularPrice" className="font-semibold flex flex-col items-center">
                                Regular Price
                                <span className="text-sm">
                                    ($ / Month)
                                </span>
                            </label>
                        </div>
                        {
                            formData.offer && (
                            <div className="flex items-center gap-4">
                                <input 
                                    type="number" 
                                    name="discountPrice" 
                                    id="discountPrice" 
                                    className="border border-gray-300 p-2 rounded-md" 
                                    min="0"
                                    max="10000" 
                                    onChange={ onInputChange }
                                    value={ formData.discountPrice }
                                    />
                                <label htmlFor="discountPrice" className="font-semibold flex flex-col items-center">
                                    Discounted Price 
                                    <span className="text-sm">
                                        ($ / Month)
                                    </span>
                                </label>
                            </div>
                            )
                        }
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
                            onChange={ (evt) => handleFileChange(evt) }
                            type="file" 
                            name="images" 
                            id="images" 
                            className="border border-gray-300 p-3 rounded-md w-full" 
                            accept="image/*"
                            multiple
                            />
                            <button
                                type="button"
                                onClick={ handleImageSubmit } 
                                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                                disabled={ isLoading }>
                                {
                                    isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            <span>Updating...</span>
                                        </div>
                                    ) : (
                                        'Upload'
                                    )
                                }
                            </button>
                    </div>
                    <p className="text-red-700 font-semibold self-center">
                        { imageErrorMsg && imageErrorMsg }
                    </p>
                    {
                        formData.imageUrls?.length > 0 &&
                        formData.imageUrls.map( (url, index) => (
                            <div key={ url } className="flex justify-between p-3 border rounded-md items-center">
                                <img
                                    src={ url }
                                    alt="listing"
                                    className="w-20 h-20 object-contain rounded-md"
                                />
                                <button
                                    onClick={ () => handleRemoveImage( index ) }
                                    type="button" 
                                    className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                    <button
                        className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 self-center w-full"
                        disabled={ isLoading }
                        >
                        {
                            isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                'Update Listing'
                            )
                        }
                    </button>
                </div>
            </form>
        </main>
    )
};

export default UpdateListing;