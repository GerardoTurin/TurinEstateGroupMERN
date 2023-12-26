import Listing from "../models/listingModel.js";





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




export {
    createListing
};