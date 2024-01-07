import { Router } from 'express';
import { body, param, query } from 'express-validator';
import existingEmail from '../helpers/existingEmail.js';
import validateFields from '../middlewares/validateFields.js';
import checkAuth from '../middlewares/authCheck.js';
import { createListing, getListingsUser, deleteListing, updateListing, getListingById } from '../controllers/listingController.js';



const listingRouter = Router();




//! POST - Create Listing
listingRouter.post('/create', 
                    checkAuth,
                    createListing);



listingRouter.get('/:id', 
                    checkAuth,
                    getListingsUser);


//! DELETE - Delete Listing
listingRouter.delete('/delete/:id', 
                    checkAuth,
                    deleteListing);



//! PUT - Update Listing
listingRouter.patch('/update/:id', 
                    checkAuth,
                    updateListing);



//! GET - Get Listing by ID
listingRouter.get('/get-id/:id', 
                    getListingById);


export default listingRouter;