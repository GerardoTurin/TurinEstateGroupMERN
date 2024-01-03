import alertify from "alertifyjs";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const useEstateStore = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    

    const startCreateListing = async (formData) => {
        try {
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: user._id
                
                })
            });

            const data = await res.json();

            if (data.ok) {
                alertify.success(`Thanks for signing up, now check your email to confirm your account`);
                navigate('/');
                
            } else {
                const errorMessage = data.msg;
                alertify.error(`Error signing up: ${errorMessage}`);
            }
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error signing up, contact the administrator');
        }
    };



    const startGetListingsUser = async (userId) => {
        try {
            const res = await fetch(`/api/listing/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error signing up, contact the administrator');
        }
    };



    return {
        user,
        startCreateListing,
        startGetListingsUser
    };
};

export default useEstateStore;