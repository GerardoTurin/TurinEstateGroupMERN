import express from "express";
import cors from "cors";
import conectDB from "../db/conectDB.js";
import userRouter from "../routes/userRoute.js";
import cookieParser from "cookie-parser";
import listingRouter from "../routes/listingRoute.js";
//path
import path from "path";

const __dirname = path.resolve();





// Crear server con una class

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.paths = {
            userPath: '/api/user',       // Creamos una ruta para los eventos
            listingPath: '/api/listing',
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
        this.app.use( cors(
            {
                origin: ['http://localhost:5173', 'https://turinestategroupmern.onrender.com'],
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            }
        ) ); // use: para usar un middleware
        
        
        // Lectura y parseo del body
        this.app.use( express.json() ); 


        this.app.use(cookieParser(
            { sameSite: 'none', secure: true}
        ));   // cookieParser: para usar cookies, se usa antes de las rutas
        
        
         // Lectura y parseo del body
        //this.app.use( express.urlencoded({ extended: false }));
        //this.app.use( bodyParser.json() ); */

        // Directorio carpeta publica
        this.app.use(express.static(path.join( __dirname, '/frontend/dist')));   // use: para usar un middleware
        //this.app.use(express.static(path.join( path.dirname(import.meta.url), '/public/index.html')));
        //this.app.use(express.static('public'));   // use: para usar un middleware
        
        // Subir archivo a la carpeta uploads
        //this.app.use("/uploads", express.static(path.join( __dirname, '../uploads')));   // use: para usar un middleware
        
    };
    
    
    // Rutas de mi app
    routes() {
        this.app.use( this.paths.userPath, userRouter );   // use: para usar un middleware
        this.app.use( this.paths.listingPath, listingRouter );   // use: para usar un middleware
        this.app.get('*', (req, res) => {
            res.sendFile(path.join( __dirname, '/frontend/dist/index.html'));
        });
    };


    // Escuchar servidor

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    };

}


export default Server;