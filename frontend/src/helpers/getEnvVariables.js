
export const getEnvVariables = () => {
    
    //import.meta.env;

    return {
        VITE_MODE: import.meta.env.VITE_MODE,
        VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID_GOOGLE,
        VITE_FIREBASE_API: import.meta.env.VITE_FIREBASE_API_KEY,
        //...import.meta.env,
    };
};