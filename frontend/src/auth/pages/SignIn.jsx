import { Link } from "react-router-dom";
import useSingInForm from "../hooks/useSingInForm";



const SignIn = () => {
    const { email, password, onInputChange, handleSubmit, isLoading } = useSingInForm();

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign In
            </h1>

            <form
                onSubmit={ handleSubmit } 
                className="flex flex-col gap-3">

                <label htmlFor="email" className="block">
                    Email
                </label>
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    autoComplete="on"
                    value={ email }
                    onChange={ onInputChange }
                    className="border border-gray-300 p-2 rounded-lg" 
                    />
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input 
                    type="password"
                    name="password" 
                    id="password" 
                    autoComplete="on"
                    value={ password }
                    onChange={ onInputChange }
                    className="border border-gray-300 p-2 rounded-lg" 
                    />
                <button
                    disabled={ isLoading }
                    className="bg-slate-500 text-white p-2 rounded-lg mt-3 hover:bg-slate-700 w-52 mx-auto">
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
                            'Sign In'
                        )
                    }
                </button>

            </form>
            <div className="flex gap-2 mt-5">
                <p>Don&apos;t have an account?</p>
                <Link to="/signup" >
                    <span className="text-blue-700">
                        Sign Up
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default SignIn;