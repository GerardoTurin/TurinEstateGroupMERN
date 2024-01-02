import { Router } from 'express';
import { body, param, query } from 'express-validator';
import existingEmail from '../helpers/existingEmail.js';
import validateFields from '../middlewares/validateFields.js';
import checkAuth from '../middlewares/authCheck.js';
import { createListing, getListingsUser } from '../controllers/listingController.js';



const listingRouter = Router();




//! POST - Create Listing
listingRouter.post('/create', 
                    checkAuth,
                    createListing);



listingRouter.get('/:id', 
                    checkAuth,
                    getListingsUser);


export default listingRouter;