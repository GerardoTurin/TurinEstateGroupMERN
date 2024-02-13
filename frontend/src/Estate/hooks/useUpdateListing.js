import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import useEstateStore from "./useEstateStore";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase";

const useUpdateListing = () => {
    const [files, setFiles] = useState([]);
    const [ imageErrorMsg, setImageErrorMsg ] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const { startGetListingById, startUpdateListing } = useEstateStore();
    const params = useParams();
    const [formData, setFormData] = useState({
        imageUrls: [],
        routeImages: [],
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

    useEffect(() => {
        const { listingId } = params;
        
        const getListing = async () => {
            const data = await startGetListingById( listingId );
            console.log(data);
            setFormData({
                imageUrls: data.listing.imageUrls,
                routeImages: data.listing.routeImages,
                name: data.listing.name,
                address: data.listing.address,
                description: data.listing.description,
                sale: data.listing.sale,
                type: data.listing.type,
                parking: data.listing.parking,
                furnished: data.listing.furnished,
                offer: data.listing.offer,
                bedrooms: data.listing.bedrooms,
                bathrooms: data.listing.bathrooms,
                regularPrice: data.listing.regularPrice,
                discountPrice: data.listing.discountPrice,
            });
        };

        getListing();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onInputChange = (evt) => {
        const { id, type, checked, name, value } = evt.target;

        if (id === 'sale' || id === 'rent') {
            setFormData({ ...formData, type: id });
        }

        if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setFormData({ ...formData, [id]: checked });
        }

        if (type === 'number' || type === 'text' || type === 'textarea') {
            setFormData({ ...formData, [name]: value });  //
        }
    };



    const handleFileChange = (evt) => {
        const { files } = evt.target;
        setFiles( files );
    };


    const handleImageSubmit = () => {
        if (files.length > 0 && files.length +  formData.imageUrls.length < 7) {
            setIsLoading(true);
            setImageErrorMsg(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push( storeImages( files[i] ) );
            }
            
            Promise.all(promises).then( (files) => {
                console.log(files);
                const urls = files.map(file => file.downloadURL);
                const paths = files.map(file => file.filePath);
                setFormData({ 
                    ...formData, 
                    imageUrls: formData.imageUrls.concat(urls),
                    routeImages: formData.routeImages.concat(paths)
                });
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
            const fileName = new Date().getTime() + file.name;  // 1629781231231.jpg
            const storageRef = ref(storage, fileName);
            console.log(storageRef);
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
                        resolve({
                            downloadURL,
                            filePath: uploadTask.snapshot.ref.fullPath,
                        
                        })
                        console.log('File available at', downloadURL, uploadTask.snapshot.ref.fullPath);
                        //setFormData({ ...formData, photo: downloadURL });
                    });
                }
            );
        });
    };



    const handleRemoveImage = ( index ) => {
        const path = formData.routeImages[index];

        if (!path) {
            console.log('Invalid file path');
            return;
        }

        const storageRef = ref(storage, path);

        deleteObject(storageRef).then(() => {
            const image = formData.imageUrls.filter( (img, i) => i !== index );
            const Path = formData.routeImages.filter( (path, i) => i !== index );
            setFormData({ ...formData, imageUrls: image, routeImages: Path });

            console.log('File deleted successfully');
        }).catch((error) => {
            console.log('Error deleting file', error);
        });


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
            await startUpdateListing( params.listingId, formData );
            
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };



    return {
        files,
        setFiles,
        imageErrorMsg,
        setImageErrorMsg,
        isLoading,
        setIsLoading,
        formData,
        setFormData,
        onInputChange,
        handleFileChange,
        handleImageSubmit,
        handleRemoveImage,
        handleSubmit
    };
};

export default useUpdateListing;