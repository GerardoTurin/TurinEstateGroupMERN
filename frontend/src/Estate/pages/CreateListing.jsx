import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [ imageErrorMsg, setImageErrorMsg ] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    console.log(formData);



    const handleFileChange = (evt) => {
        const { files } = evt.target;
        setFiles(files);
    };



    const handleImageSubmit = () => {
        if (files.length >= 1 && files.length +  formData.imageUrls.length <= 6) {
            setIsLoading(true);
            setImageErrorMsg(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push( storeImages( files[i] ) );
            }

            Promise.all(promises).then( (urls) => {
                console.log(urls);
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageErrorMsg(false);
                setIsLoading(false);

            }).catch( (error) => {
                console.log(error);
                setImageErrorMsg('Error uploading images (2 mb max per image)');
                setIsLoading(false);
            })
            
        } else {
            setImageErrorMsg('You can only upload 6 images');
            setIsLoading(false);
        }
    };



    const storeImages = async (file) => {
        return new Promise( ( resolve, reject ) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;  // 1629781231231.jpg
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // error
                    reject(error);
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                        console.log('File available at', downloadURL);
                        //setFormData({ ...formData, photo: downloadURL });
                    });
                }
            );
        });
    };



    const handleRemoveImage = ( index ) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.filter( (url, i) => i !== index ) });
    }; 



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
                                            <span>Loading...</span>
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
                        formData.imageUrls.length > 0 &&
                        formData.imageUrls.map( (url, index) => (
                            <div key={ index } className="flex justify-between p-3 border rounded-md items-center">
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
                        className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 self-center w-full">
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    )
};

export default CreateListing;