import Product from "../models/product.js"


export const addRating = async (req, res) => {

    console.log(req.body, req.params)

    const { productId, rating } = req.params

    const product = await Product.findOneAndUpdate({ id: productId }, { rating }, { new: true })

    return res.json(product)
}