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
                navigate(`/listing/${data.listing._id}`);
                
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


    const startDeleteListing = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            if (data.ok) {
                alertify.success(`Deleted listing`);
                
            } else {
                const errorMessage = data.msg;
                alertify.error(`Error: ${errorMessage}`);
            }
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error signing up, contact the administrator');
        }
    };




    const startGetListingById = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/get-id/${listingId}`, {
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



    const startUpdateListing = async (listingId, formData) => {
        try {
            const res = await fetch(`/api/listing/update/${listingId}`, {
                method: 'PATCH',
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
                alertify.success(`Listing updated`);
                navigate(`/listing/${listingId}`);
                
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


    const startGetUserById = async (userId) => {
        try {
            const res = await fetch(`/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('res', res);

            const data = await res.json();
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error signing up, contact the administrator');
        }
    };



    const startGetAllListings = async (searchQuery) => {
        try {
            const res = await fetch(`/api/listing?${searchQuery}`, {
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
        startGetListingsUser,
        startDeleteListing,
        startGetListingById,
        startUpdateListing,
        startGetUserById,
        startGetAllListings
    };
};

export default useEstateStore;