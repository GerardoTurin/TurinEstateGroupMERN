import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import useAuthStore from "../hooks/useAuthStore";
import { useState } from "react";
import alertify from 'alertifyjs';


const SignUpFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''

};



const SignUp = () => {

    const { name, email, password, confirmPassword, onInputChange, onResetForm } = useForm( SignUpFormFields );
    const { startSignUp, validateEmail } = useAuthStore();
    const [ isLoading, setIsLoading ] = useState( false );

    // si el usuario ya esta autenticado, redirigirlo a la pagina de inicio
    const navigate = useNavigate();


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


        try {
            await startSignUp( name, email, password );
            onResetForm();
            navigate( '/' );
            
        } catch (error) {
            console.log(error);
            alertify.error( error.message );

        } finally {
            setIsLoading( false );
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto" onSubmit={ handleSubmit }>
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign Up
            </h1>

            <form className="flex flex-col gap-3">
                <label htmlFor="name" className="block">
                    Name
                </label>
                <input 
                    type="text" 
                    name="name"
                    id="name" 
                    autoComplete="on"
                    className="border border-gray-300 p-2 rounded-lg" 
                    value={ name }
                    onChange={ onInputChange }
                    />
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input 
                    type="email" 
                    name="email"
                    id="email" 
                    autoComplete="on"
                    className="border border-gray-300 p-2 rounded-lg" 
                    value={ email }
                    onChange={ onInputChange }
                    />
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input 
                    type="password" 
                    name="password"
                    id="password" 
                    className="border border-gray-300 p-2 rounded-lg" 
                    value={ password }
                    onChange={ onInputChange }
                    />
                <label htmlFor="confirmPassword" className="block">
                    Confirm Password
                </label>
                <input 
                    type="password" 
                    name="confirmPassword"
                    id="confirmPassword" 
                    className="border border-gray-300 p-2 rounded-lg" 
                    value={ confirmPassword }
                    onChange={ onInputChange }
                    />

                <button 
                    className="bg-slate-500 text-white text-center p-2 rounded-lg mt-3 hover:bg-slate-700"
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
                            'Sign Up'
                        )
                    }
                </button>

                {/* sign up with google */}
                <button className="bg-red-500 text-white p-2 rounded-lg mt-3 hover:bg-red-700">
                    Continue with Google
                </button>

            </form>
            {/* have account */}
            <div className="flex gap-2 mt-5">
                <p>Have an account? </p>
                <Link to="/signin">
                    <span className="text-blue-700">
                        Sign In
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default SignUp;