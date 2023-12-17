import { useDispatch, useSelector } from "react-redux";

import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import { checkLogin, checkRegister, onLogout, onSignIn } from "../../store/features/auth/authSlice";



const useAuthStore = () => {

    const { status, user, errorMenssage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    //^ Expresión regular para validar un email

        return re.test(email);  //^ Devuelve true o false
    };



    const startSignUp = async (name, email, password) => {
        dispatch( checkRegister() );

        try {
            const res = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            },
            { withCredentials: true }
            );

            const data = await res.json();

            if (data.ok) {
                const { newUser } = data;
                alertify.success(`Thanks ${newUser.name} for signing up, now check your email to confirm your account`);
                navigate('/signin');
                
            } else {
                const errorMessage = data.msg;
                dispatch( onLogout( errorMessage ) );
                alertify.error(`Error signing up: ${errorMessage}`);
            }
            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error signing up, contact the administrator');
        }
    };




    const startSignIn = async ( email, password ) => {
        dispatch( checkLogin() );

        try {
            const res = await fetch('/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            
            if (data.ok) {
                const { user } = data;

                dispatch( onSignIn( user ) );
                alertify.success(`Welcome ${ user.name }`);
                navigate('/');
            } else {
                
                const errorMessage = data.msg;
                dispatch( onLogout( errorMessage ) );
                alertify.error(`Error signing in: ${errorMessage}`);
            }

            return data;

        } catch (error) {
            console.log(error);
            alertify.error('Error contact the administrator');
        }
    };





    
    return {
    
        //^ Propiedades
        status,
        user,
        errorMenssage,
    
    
    
        //^ Metodos
        validateEmail,
        startSignUp,
        startSignIn
    }
};



export default useAuthStore;