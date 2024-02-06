import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";
import useEstateStore from "../hooks/useEstateStore";

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [ imageErrorMsg, setImageErrorMsg ] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const { startCreateListing } = useEstateStore();
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        address: '',
        description: '',
        sale: false,
        type: 'rent',
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 1000,
        discountPrice: 0,
    });

    const onInputChange = (evt) => {
        if (evt.target.id === 'sale' || evt.target.id === 'rent') {
            setFormData({ ...formData, type: evt.target.id });
        }

        if (evt.target.id === 'parking' || evt.target.id === 'furnished' || evt.target.id === 'offer') {
            setFormData({ ...formData, [evt.target.id]: evt.target.checked });
        }

        if (evt.target.type === 'number' || evt.target.type === 'text' || evt.target.type === 'textarea') {
            setFormData({ ...formData, [evt.target.name]: evt.target.value });  //
        }
    };



    const handleFileChange = (evt) => {
        const { files } = evt.target;
        //const files = evt.target.files;
        const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));

        console.log(files);

        
        // No se pueden subir mas de 6 imagenes
        if (files.length + formData.imageUrls.length > 6) {
            setImageErrorMsg('You can only upload 6 images');
        } else {
            setFormData({ ...formData, imageUrls: formData.imageUrls.concat(imageUrls) });
            setImageErrorMsg(false);
            setFiles( files );
        }
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
                //setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
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



    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        try {
            if (formData.imageUrls.length < 1) {
                setImageErrorMsg('You need to upload at least 1 image');
                return;
            }
            if (formData.regularPrice < formData.discountPrice) {
                setImageErrorMsg('Discounted price cannot be greater than regular price');
                return;
            }
            await startCreateListing( formData );
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };


    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className='text-center font-bold text-3xl my-10'>
                Create a Listing
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
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                'Create Listing'
                            )
                        }
                    </button>
                </div>
            </form>
        </main>
    )
};

export default CreateListing;