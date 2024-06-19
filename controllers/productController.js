import { query } from "express"
import ErrorHandler from "../middlewares/error.js"
import Product from "../models/product.js"


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