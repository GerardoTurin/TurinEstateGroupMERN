import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../auth/hooks/useAuthStore";
//import useForm from "../../auth/hooks/useForm";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";
import SignOut from "../components/SignOut";
import DeleteAccount from "../components/DeleteAccount";

const Profile = () => {
    const fileRef = useRef(undefined);
    const { user, startUpdateUser } = useAuthStore();
    //const { onInputChange } = useForm( user );
    const [ file, setFile ] = useState(null);
    const [ photoPercentage, setPhotoPercentage ] = useState(0);
    const [ photoErrorMsg, setPhotoErrorMsg ] = useState(false);
    const [ isLoading, setIsLoading ] = useState( false );
    const { name, email, photo, googleUser } = user;
    const [ formData, setFormData ] = useState({
        name: name,
        email: email,
        password: '',
        photo: photo
    });

    
    /* useEffect(() => {
        setFormData({ name: name, email: email, password: '', photo: photo });
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps */

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
                // complete
                setPhotoErrorMsg(false);
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


    

    
    
    
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center my-7 font-semibold">
                Profile
            </h1>

            <form 
                onSubmit={ handleSubmit }
                className="flex flex-col mx-auto gap-3">
                <input
                    type="file"
                    ref={ fileRef }
                    hidden
                    accept="image/*"
                    onChange={ (e) => setFile(e.target.files[0]) }
                    />
                <img
                    className="w-24 h-24 rounded-full object-cover cursor-pointer mx-auto my-5"
                    onClick={ () => fileRef.current.click() }
                    src={ formData?.photo || photo }
                    alt="user profile"
                />
                <p className="text-sm font-semibold self-center">
                    {
                        photoErrorMsg ?
                        ( <span className="text-red-500">
                            Error uploading photo ( max size 2MB )
                        </span> )
                        : photoPercentage > 0 && photoPercentage < 100 ? 
                        ( <span className="text-blue-500">
                            { `Uploading ${ photoPercentage }%` }
                        </span> )
                        : photoPercentage === 100 ?
                        ( <span className="text-green-500">
                            Photo uploaded successfully
                        </span> )
                        : ('')

                    }
                </p>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-3"
                    placeholder="Name"
                    name="name"
                    value={ formData.name }
                    id="name"
                    autoComplete="off"
                    onChange={ onInputChange }
                    />
                <input
                    disabled
                    type="email"
                    className="border border-gray-300 rounded-md p-3"
                    placeholder="Email"
                    name="email"
                    value={ formData.email }
                    id="email"
                    autoComplete="off"
                    onChange={ onInputChange }
                    />
                <input
                    type="password"
                    className="border border-gray-300 rounded-md p-3"
                    placeholder="Password"
                    id="password"
                    autoComplete="off"
                    onChange={ onInputChange }
                    disabled={ googleUser ? true : false }
                    />

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-3"
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
                            'Update Profile'
                        )
                    }
                </button>
            </form>
            <div className="flex mt-3 justify-between">
                <DeleteAccount />
                <SignOut />
            </div>
        </div>
    )
};

export default Profile;