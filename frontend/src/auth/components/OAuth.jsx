import { GoogleLogin } from '@react-oauth/google';
import { getEnvVariables } from '../../helpers/getEnvVariables';
import { jwtDecode } from "jwt-decode";
import alertify from 'alertifyjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLogout, onSignIn } from '../../store/features/auth/authSlice';


const OAuth = () => {
    const { VITE_GOOGLE_CLIENT_ID } = getEnvVariables();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSuccess = async (data) => {
        const credentials = jwtDecode(data.credential);

        try {
            const res = await fetch('/api/user/google-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    photo: credentials.picture
                }),
            });


            const data = await res.json();
            
            if (data.ok) {
                const { user } = data;

                dispatch(onSignIn(user));
                alertify.success(`Welcome ${user.name}`);
                navigate('/');

            } else {
                const errorMessage = data.msg;
                dispatch(onLogout(errorMessage));
                alertify.error(`Error signing in: ${errorMessage}`);
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <GoogleLogin
                clientId={VITE_GOOGLE_CLIENT_ID}
                onSuccess={ handleSuccess }
                onFailure={() => console.log('Login Failure')}
                width='100%'
            />
        </div>
    );
};

export default OAuth;