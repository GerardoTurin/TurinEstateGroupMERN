import existingEmail from "../helpers/existingEmail.js";
//import errorHandlers from "../middlewares/error.js";
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import userModel from "../models/userModel.js";
import generateJWT from "../helpers/generateJWT.js";
import { JWT, OAuth2Client } from "google-auth-library";




const getUsers = (req, res) => {
    //const users = await userModel.find();

    res.json({
        ok: true,
        msg: 'Users Obtained',
    });
};




//! Register User

const SignUp = async (req, res) => {
    const { name, email, password } = req.body;


    if ( await existingEmail(email) ) {
        res.status(400).json({  
            ok: false,
            msg: 'Email already exists'
        });
        return;
    };



    try {
        const newUser = new userModel({ name, email, password });
        await newUser.save();

        res.status(200).json({
            ok: true,
            msg: 'User Created',
            newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });

        //next(errorHandlers(500, 'Please contact the administrator'));
    };
};





//! OAuth Google

const googleSignIn = async (req, res) => {
    const { email, name, photo } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Please use your normal authentication'
            });

        } else {
            user = new userModel({
                name,
                email,
                photo,
                checkUser: true,
                googleUser: true,
                password: 'google', // Puedes usar una contraseña predeterminada o generar una aleatoria
            });

            await user.save();
        }

        // Generar JWT, enviar respuesta, etc.
        const token = await generateJWT(user.id, user.name);

        // Send HTTP-ONLY cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
        });

        res.status(200).json({
            ok: true,
            msg: 'User Logged',
            user,
            token
        });
    

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

};






//! Sign In User

const SignIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if ( !user ) {
        return res.status(404).json({
            ok: false,
            msg: 'Email is not registered'
        });
    };

    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);

    if ( !validPassword ) {
        return res.status(400).json({
            ok: false,
            msg: 'Password is not valid'
        });
    };


    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    // Send HTTP-ONLY cookie with the token
    res.cookie('token', token, {
        httpOnly: true,
        //secure: false,
        //maxAge: 1000 * 60 * 60 * 24, // 1 day
        //path: '/'
    });


    res.status(200).json({
        ok: true,
        msg: 'User Logged',
        user,
        token
    });
};





export {
    getUsers,
    SignUp,
    SignIn,
    googleSignIn
};