import mongoose from "mongoose";
import colors from 'colors';    // Importar módulo colors

const conectDB = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_URL);
        console.log('Base de datos ONLINE'.green);

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos'.red);
    }
};





export default conectDB;