import useAuthStore from "../../auth/hooks/useAuthStore";

const DeleteAccount = () => {
    const { user, startDeleteUser } = useAuthStore();
    const { _id } = user;

    const handleDelete = async () => {
        await startDeleteUser(_id);
    };



    return (
        <span 
            onClick={ handleDelete }
            className="text-red-700 cursor-pointer font-semibold">
            Delete Account
        </span>
    )
};

export default DeleteAccount;