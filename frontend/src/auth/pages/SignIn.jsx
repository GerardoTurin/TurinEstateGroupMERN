import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Sign In
            </h1>

            <form className="flex flex-col gap-3">

                <label htmlFor="email" className="block">
                    Email
                </label>
                <input type="email" id="email" className="border border-gray-300 p-2 rounded-lg" />
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input type="password" id="password" className="border border-gray-300 p-2 rounded-lg" />
                <button className="bg-slate-500 text-white p-2 rounded-lg mt-3 hover:bg-slate-700">
                    Sign In
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