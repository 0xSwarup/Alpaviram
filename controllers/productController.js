import Product from "../models/product.js"


export const createProduct=async(req,res,next)=>{
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json({
            sucess:true,
            message:"Product created sucessfully",
        savedProduct
        })
    } catch (error) {
        next(error)
    }
}