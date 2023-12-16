import { Router } from 'express';
import { body, param, query } from 'express-validator';
import existingEmail from '../helpers/existingEmail.js';
import validateFields from '../middlewares/validateFields.js';
import { 
        SignUp, 
        getUsers, 
        SignIn 
                } from '../controllers/userController.js';


const userRouter = Router();

const validateName = [ body('name', 'El nombre es necesario').not().isEmpty() ];
const validateEmail = [ body('email', 'El correo no es valido').custom( existingEmail ).isEmail() ];
const validatePassword = [ body('password', 'La contraseña es obligatoria y/o debe tener mas de 6 caracteres').isLength({ min: 6 }) ];


//! POST - Register User
userRouter.post('/signup', 
                validateName,
                validateEmail,
                validatePassword,
                validateFields,
                SignUp
                );


//! POST - Sign In User
userRouter.post('/signin', 
                validateEmail,
                validatePassword,
                validateFields,
                SignIn
                );


//! GET - All Users
userRouter.get('/', getUsers);







export default userRouter;