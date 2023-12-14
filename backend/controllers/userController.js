import existingEmail from "../helpers/existingEmail.js";
import userModel from "../models/userModel.js";




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
        return res.status(400).json({
            ok: false,
            msg: 'Email already exists'
        });
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
    };
};





export {
    getUsers,
    SignUp
};