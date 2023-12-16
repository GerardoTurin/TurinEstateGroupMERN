import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "El correo ya está registrado"],
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Por favor ingrese un correo electrónico válido",
        ]
    },
    password: {
        type: String,
        required: true,
    },
    checkUser: {
        type: Boolean,
        default: false,
    },
    googleUser:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,   // Para que nos cree la fecha de creacion y la fecha de actualizacion...
});



//^ Encriptar contraseña
const SALT_ROUNDS = 10;


// Encriptar contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
    // Si el password no ha sido modificado, no lo encriptamos
    if (!this.isModified('password')) { 
        return next();
    }

    try {
        const salt = await bcryptjs.genSalt(SALT_ROUNDS);   // Generar un salt, para encriptar el password...
        this.password = await bcryptjs.hash(this.password, salt);  // Encriptar el password...
        next();
    } catch (error) {
        next(error);
    }
});


// Comparar contraseñas
/* userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}; */

//^ No mostrar el password en la respuesta
userSchema.methods.toJSON = function() {
    const { password, __v, ...user } = this.toObject();
    return user;
};


export default model('User', userSchema);