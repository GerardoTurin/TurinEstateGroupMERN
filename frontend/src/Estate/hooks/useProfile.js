import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../auth/hooks/useAuthStore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";


const useProfile = () => {
    const fileRef = useRef(undefined);
    const { user, startUpdateUser } = useAuthStore();
    const [ file, setFile ] = useState(null);
    const [ photoPercentage, setPhotoPercentage ] = useState(0);
    const [ photoErrorMsg, setPhotoErrorMsg ] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const { name, email, photo, googleUser } = user;
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        photo: ''
    });
    

    
    useEffect(() => {
        setFormData({ name: name, email: email, password: '', photo: photo });
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (file) {
            handleUploadFile(file);
        }
    }, [file]); // eslint-disable-line react-hooks/exhaustive-deps


    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormData(form => ({
            ...form,
            [name]: value
        }));
    };

    const handleUploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;  // 1629781231231.jpg
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                setPhotoPercentage(Math.round(progress));
            },
            (error) => {
                // error
                console.log(error);
                setPhotoErrorMsg(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFormData({ ...formData, photo: downloadURL });
                });
            }
        );
    };  


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading( true );
        
        try {
            await startUpdateUser(formData);
        } catch (error) {
            console.log(error);
        }
        setIsLoading( false );
    };


    return {
        fileRef,
        file,
        photoPercentage,
        photoErrorMsg,
        isLoading,
        photo,
        name,
        email,
        googleUser,
        formData,
        onInputChange,
        handleSubmit
    };
};

export default useProfile;