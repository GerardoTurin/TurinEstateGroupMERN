import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useEstateStore from "./useEstateStore";
import { storage } from "../../firebase";

const useCreateListing = () => {
    const fileInputRef = useRef();
    const [files, setFiles] = useState([]);
    const [ imageErrorMsg, setImageErrorMsg ] = useState(false);
    const [error, setError] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const [uploading, setUploading] = useState( false );
    const [previewUrls, setPreviewUrls] = useState([]);
    const { startCreateListing } = useEstateStore();
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

    const onInputChange = (evt) => {
        const { id, value, name, type, checked } = evt.target;

        if (id === 'sale' || id === 'rent') {
            setFormData({ ...formData, type: id });
        };
        if (id === 'parking' || id === 'furnished' || id === 'offer') {
            setFormData({ ...formData, [id]: checked });
        };
        if (type === 'number' || type === 'text' || type === 'textarea') {
            setFormData({ ...formData, [name]: value });  //
        };
    };



    const handleFileChange = (evt) => {        
        const { files } = evt.target;
        setFiles(files);

        // Crea URLs de blob para los archivos seleccionados
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        console.log(files);

        // Limpiar URLs de blob cuando se desmonte el componente
        return () => {
            urls.forEach(URL.revokeObjectURL);
        };
    };


    const handleImageSubmit = (evt) => {
        evt.preventDefault();

        if (files.length > 0 && files.length +  formData.imageUrls.length < 7) {
            const promises = [];
            //setIsLoading(true);
            setUploading(true);
            setImageErrorMsg(false);

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
                //setIsLoading(false);
                setUploading(false);

            }).catch( (error) => {
                console.log(error);
                setImageErrorMsg('Error uploading images (2 mb max per image)');
                //setIsLoading(false);
                setUploading(false);
            })
            
        } else {
            setImageErrorMsg('You can only upload 6 images');
            //setIsLoading(false);
            setUploading(false);
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
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve({
                            downloadURL,
                            filePath: uploadTask.snapshot.ref.fullPath
                        
                        })
                        console.log('File available at', downloadURL, uploadTask.snapshot.ref.fullPath);
                        //setFormData({ ...formData, photo: downloadURL }); 
                    });
                }
            );
        });
    };



    const handleRemoveImage = ( index ) => {
        //setFormData({ ...formData, imageUrls: formData.imageUrls.filter( (url, i) => i !== index ) });
        setPreviewUrls( previewUrls.filter( (url, i) => i !== index ) );
        setFiles(Array.from(files).filter((file, i) => i !== index));

        // Si no hay más archivos seleccionados, restablece el input de archivo
        if (files.length === 1) {
            fileInputRef.current.value = '';
        };
    }; 



    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        try {
            if (formData.imageUrls.length < 1) {
                setImageErrorMsg('You need to upload at least 1 image');
                setIsLoading(false);
            }
            if (formData.regularPrice < formData.discountPrice) {
                setImageErrorMsg('Discounted price cannot be greater than regular price');
                setIsLoading(false);
            }
            await startCreateListing( formData );
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };




    return {
        fileInputRef,
        files,
        setFiles,
        imageErrorMsg,
        setImageErrorMsg,
        error,
        setError,
        isLoading,
        setIsLoading,
        uploading,
        setUploading,
        previewUrls,
        setPreviewUrls,
        formData,
        setFormData,
        onInputChange,
        handleFileChange,
        handleImageSubmit,
        storeImages,
        handleRemoveImage,
        handleSubmit
    };
};

export default useCreateListing;