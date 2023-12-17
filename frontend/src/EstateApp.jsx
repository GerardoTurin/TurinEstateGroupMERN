import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { persistor, store } from "./store/store";




const EstateApp = () => {
    return (
        <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default EstateApp;
