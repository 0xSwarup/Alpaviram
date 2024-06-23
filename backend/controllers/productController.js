import { query } from "express"
import ErrorHandler from "../middlewares/error.js"
import Product from "../models/product.js"
import mongoose from 'mongoose';


export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json({
            sucess: true,
            message: "Product created sucessfully",
            savedProduct
        })
    } catch (error) {
        next(error)
    }
}


export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            message: "Product Updated Sucessfully",
            updatedProduct
        });

    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted....");


    } catch (error) {
        next(error)
    }
}

export const getAllProduct = async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let product;
        if (qNew) {
            product = await Product.find().sort({ createedAt: -1 }).limit(5)
        }
        else if (qCategory) {
            product = await Product.find({
                category: {
                    $in: [qCategory]
                },

            });
        } else {
            product = await Product.find();
        }


        res.status(500).json(product);
    } catch (error) {
        next(error)
    }
}
export const getSingleProduct = async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}


const ObjectId = mongoose.Types.ObjectId;

export const rating = async (req, res, next) => {
    try {
        // Ensure req.user is properly set by the isAuthenticated middleware
        if (!req.user || !_id) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const { _id } = req.user; // Ensure this line executes without errors
        const { star, ProductId } = req.body;

        // Validate ProductId as ObjectId
        if (!ObjectId.isValid(ProductId)) {
            return res.status(400).json({ success: false, message: "Invalid ProductId" });
        }

        // Find the product by ProductId
        const product = await Product.findById(ProductId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if the user has already rated the product
        const alreadyRated = product.ratings.find(rating => rating.postedby.toString() === _id.toString());

        if (alreadyRated) {
            // Update the existing rating
            const updateRating = await Product.updateOne(
                { "_id": ProductId, "ratings.postedby": _id },
                { $set: { "ratings.$.star": star } },
                { new: true }
            );
            return res.json(updateRating);
        } else {
            // Add a new rating
            const rateProduct = await Product.findByIdAndUpdate(
                ProductId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            postedby: _id,
                        },
                    },
                },
                { new: true }
            );
            return res.json(rateProduct);
        }
    } catch (error) {
        next(error);
    }
};
