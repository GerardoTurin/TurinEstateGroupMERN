import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { persistor, store } from "./store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getEnvVariables } from "./helpers/getEnvVariables";




const EstateApp = () => {
    const { VITE_GOOGLE_CLIENT_ID } = getEnvVariables();
    return (
        <GoogleOAuthProvider 
            clientId={ VITE_GOOGLE_CLIENT_ID }
        >
            <Provider store={ store }>
                <PersistGate loading={ null } persistor={ persistor }>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    )
}

export default EstateApp;
