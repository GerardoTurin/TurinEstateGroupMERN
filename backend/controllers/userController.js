import userModel from "../models/userModel.js";



const getUsers = (req, res) => {
    //const users = await userModel.find();

    res.json({
        ok: true,
        msg: 'Users Obtained',
    });
};





export {
    getUsers
};