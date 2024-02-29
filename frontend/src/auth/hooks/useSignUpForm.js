import { useState } from "react";
import useAuthStore from "./useAuthStore";
import useForm from "./useForm";
import alertify from "alertifyjs";


const SignUpFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''

};


const useSignUpForm = () => {
    const { name, email, password, confirmPassword, onInputChange, onResetForm } = useForm( SignUpFormFields );
    const { startSignUp, validateEmail } = useAuthStore();
    const [ isLoading, setIsLoading ] = useState( false );


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading( true );

        if ( name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' ) {
            alertify.error('All fields are required');
            setIsLoading( false );
            return;
        }


        if ( name.trim().length < 2 ) {
            alertify.error('Name must be at least 2 characters');
            setIsLoading( false );
            return;
        }

        if ( !validateEmail( email ) ) {
            alertify.error('Invalid email');
            setIsLoading( false );
            return;
        }

        // password y confirmPassword deben ser iguales
        if ( password !== confirmPassword ) {
            alertify.error('Passwords do not match');
            setIsLoading( false );
            return;
        }

        await startSignUp( name, email, password );
        onResetForm();
        setIsLoading( false );
    };


    return {
        name,
        email,
        password,
        confirmPassword,
        onInputChange,
        handleSubmit,
        isLoading
    };
};

export default useSignUpForm;