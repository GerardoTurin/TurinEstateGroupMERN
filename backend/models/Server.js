import express from "express";
import cors from "cors";
import conectDB from "../db/conectDB.js";
import userRouter from "../routes/userRoute.js";





// Crear server con una class

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.paths = {
            userPath: '/api/user',       // Creamos una ruta para los eventos
        }
        
        
        //Coneccion a la base de datos
        this.conectionDB();

        // Middlewares
        this.middlewares();
        
        // Rutas de mi app
        this.routes();
    };


    async conectionDB() {
        await conectDB();
    }


    middlewares() {
        // Cors
        this.app.use( cors() ); // use: para usar un middleware
        
        
        // Lectura y parseo del body
        this.app.use( express.json() ); 


        /* // Lectura y parseo del body
        this.app.use(cookieParser(
            { sameSite: 'none', secure: true}
        ));   // cookieParser: para usar cookies, se usa antes de las rutas
        this.app.use( express.urlencoded({ extended: false }));
        this.app.use( bodyParser.json() ); */

        // Directorio carpeta publica
        //this.app.use(express.static(path.join( dirname, 'public')));   // use: para usar un middleware
        //this.app.use(express.static(path.join( path.dirname(import.meta.url), '/public/index.html')));
        //this.app.use(express.static('public'));   // use: para usar un middleware

        // Subir archivo a la carpeta uploads
        //this.app.use("/uploads", express.static(path.join( __dirname, '../uploads')));   // use: para usar un middleware

    };


    // Rutas de mi app
    routes() {
        this.app.use( this.paths.userPath, userRouter );   // use: para usar un middleware
    };


    // Escuchar servidor

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    };

}


export default Server;