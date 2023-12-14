import { Link } from "react-router-dom";



const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign Up
            </h1>

            <form className="flex flex-col gap-3">
                <label htmlFor="name" className="block">
                    Name
                </label>
                <input type="text" id="name" className="border border-gray-300 p-2 rounded-lg" />
                <label htmlFor="email" className="block">
                    Email
                </label>
                <input type="email" id="email" className="border border-gray-300 p-2 rounded-lg" />
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input type="password" id="password" className="border border-gray-300 p-2 rounded-lg" />
                <label htmlFor="confirmPassword" className="block">
                    Confirm Password
                </label>
                <input type="password" id="confirmPassword" className="border border-gray-300 p-2 rounded-lg" />
                <button className="bg-slate-500 text-white p-2 rounded-lg mt-3 hover:bg-slate-700">
                    Sign Up
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