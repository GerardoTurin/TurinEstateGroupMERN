import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";




const EstateApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default EstateApp;
