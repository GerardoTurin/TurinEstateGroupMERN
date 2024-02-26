import SignOut from "../components/SignOut";
import DeleteAccount from "../components/DeleteAccount";
import { Link } from "react-router-dom";
import ShowListings from "../components/ShowListings";
import useProfile from "../hooks/useProfile";

const Profile = () => {
    const { fileRef, 
        formData, 
        photoPercentage, 
        photoErrorMsg, 
        isLoading,
        photo,
        name,
        email,
        googleUser,
        onInputChange, 
        handleSubmit, 
        setFile  } = useProfile();

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
                    className="w-32 h-32 rounded-full object-cover cursor-pointer mx-auto my-5"
                    src={ formData?.photo || photo }
                    onClick={ () => fileRef.current.click() }
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
                <Link 
                    to="/createlisting"
                    className="bg-green-500 text-white rounded-md p-3 text-center">
                    Create Listing
                </Link>
            </form>
            <div className="flex my-3 justify-between">
                <DeleteAccount />
                <SignOut />
            </div>
            <ShowListings />
        </div>
    )
};

export default Profile;