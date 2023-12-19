import useAuthStore from "../../auth/hooks/useAuthStore";
import useForm from "../../auth/hooks/useForm";

const Profile = () => {
    
    const { user } = useAuthStore();
    const { name, email, photo } = user;
    const { onInputChange } = useForm( user );
    
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center my-7 font-semibold">
                Profile
            </h1>

            <form className="flex flex-col mx-auto gap-3">
                <img
                    className="w-24 h-24 rounded-full object-cover cursor-pointer mx-auto"
                    src={photo}
                    alt="user profile"
                />
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-3"
                    placeholder="Name"
                    value={name} 
                    id="name"
                    autoComplete="off"
                    onChange={ onInputChange }
                    />
                <input
                    type="email"
                    className="border border-gray-300 rounded-md p-3"
                    placeholder="Email"
                    value={email} 
                    id="email"
                    autoComplete="off"
                    onChange={ onInputChange }
                    />

                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md p-3"
                    >
                    Update
                </button>
            </form>
            <div className="flex mt-3 justify-between">
                <span className="text-red-500 cursor-pointer font-semibold">
                    Delete Account
                </span>
                <span className="text-blue-500 cursor-pointer font-semibold">
                    Sign Out
                </span>
            </div>
        </div>
    )
};

export default Profile;