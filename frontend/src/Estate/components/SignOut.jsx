import useAuthStore from "../../auth/hooks/useAuthStore";

const SignOut = () => {
    const { startLogout } = useAuthStore();


    const handleLogout = async () => {
        try {
            await startLogout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <span
            onClick={ handleLogout } 
            className="text-red-500 cursor-pointer font-semibold">
            Sign Out
        </span>
    )
};

export default SignOut;