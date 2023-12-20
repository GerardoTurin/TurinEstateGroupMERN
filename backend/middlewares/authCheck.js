import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";


const checkAuth = async (req, res, next) => {

    try {
        const token = req.cookies.token;    // Obtenemos el token de las cookies...
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to access this route, please login'
            });
        }

        // Verificamos el token
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);  // Es para decodificar el token...

        // Buscamos el usuario por el id
        const user = await userModel.findById(verifiedToken.id).select('-password');  // Buscamos el usuario por el id, y le decimos que no nos muestre la contraseña...

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'The user does not exist'
            });
        };

        // Si todo sale bien, le pasamos el usuario a la request...
        req.user = user;
        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
};



export default checkAuth;