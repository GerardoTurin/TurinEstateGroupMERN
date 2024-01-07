import Listing from "../models/listingModel.js";




//!POST - Crear un nuevo listing
const createListing = async (req, res) => {

    const { name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls  } = req.body;
    console.log(req.body);

    // Campos obligatorios
    if ( name === undefined || description === undefined || address === undefined || regularPrice === undefined || discountPrice === undefined || bathrooms === undefined || bedrooms === undefined || furnished === undefined || parking === undefined || type === undefined || offer === undefined || imageUrls === undefined ) {
        return res.status(400).json({
            ok: false,
            msg: "Completa todos los campos son obligatorios",
        });
    };

    try {
        const listing = await Listing.create({
            userRef: req.user._id,
            name,
            description,
            address,
            regularPrice,
            discountPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
        });


        res.status(201).json({
            ok: true,
            listing,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear el listing",
        });
    };
};




//!GET - Obtener todos los listings de un usuario
const getListingsUser = async (req, res) => {
    if (req.params.id === req.user.id) {
    
        try {
            const listings = await Listing.find({ userRef: req.params.id });
    
            return res.status(200).json({
                ok: true,
                listings,
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error getting listings",
            });
        };
    }   else {
        return res.status(400).json({
            ok: false,
            msg: "No puedes obtener tus propios listings",
        });
    };
};



//! DELETE - Eliminar un listing

const deleteListing = async (req, res) => {
    const listingId = req.params.id;

    try {
        const listing = await Listing.findById( listingId );

        if ( !listing ) {
            return res.status(404).json({
                ok: false,
                msg: "Not listing found",
            });
        };

        if ( req.user.id.toString() !== listing.userRef.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: "You can't delete this listing",
            });
        };

        const deleteListing = await Listing.findByIdAndDelete( listingId );

        return res.status(200).json({
            ok: true,
            msg: "Deleted listing",
            deleteListing,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error deleting listing",
        });
    };
};




//! Update Listing

const updateListing = async (req, res) => {
    const listingId = req.params.id;
    const { name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls  } = req.body;

    try {
        const listing = await Listing.findById( listingId );

        if ( !listing ) {
            return res.status(404).json({
                ok: false,
                msg: "Not listing found",
            });
        };

        if ( req.user.id.toString() !== listing.userRef.toString() ) {
            return res.status(401).json({
                ok: false,
                msg: "You can't update this listing",
            });
        };

        const updateListing = await Listing.findByIdAndUpdate( listingId, {
            name,
            description,
            address,
            regularPrice,
            discountPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
        }, { new: true });

        return res.status(200).json({
            ok: true,
            msg: "Updated listing",
            updateListing,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error updating listing",
        });
    };
};



//! GET - Obtener listing por ID

const getListingById = async (req, res) => {

    try {
        const listing = await Listing.findById( req.params.id );

        if ( !listing ) {
            return res.status(404).json({
                ok: false,
                msg: "Not listing found",
            });
        };

        return res.status(200).json({
            ok: true,
            msg: "ListingID successfully obtained",
            listing,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error getting listing",
        });
    };
};




export {
    createListing,
    getListingsUser,
    deleteListing,
    updateListing,
    getListingById,
};