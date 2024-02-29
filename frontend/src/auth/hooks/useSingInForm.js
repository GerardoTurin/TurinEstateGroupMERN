import { useState } from "react";
import useAuthStore from "./useAuthStore";
import useForm from "./useForm";


const SignInFormFields = {
    email: '',
    password: ''
};

const useSingInForm = () => {
    const { startSignIn, validateEmail } = useAuthStore();
    const { email, password, onInputChange } = useForm( SignInFormFields );
    const [ isLoading, setIsLoading ] = useState( false );

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading( true );

        if ( email.trim() === '' || password.trim() === '' ) {
            alert('All fields are required');
            setIsLoading( false );
            return;
        }

        if ( !validateEmail( email ) ) {
            alert('Invalid email');
            setIsLoading( false );
            return;
        }

        await startSignIn( email, password );
        setIsLoading( false );
        //onResetForm();
    };


    return {
        email,
        password,
        onInputChange,
        handleSubmit,
        isLoading
    };
};

export default useSingInForm;