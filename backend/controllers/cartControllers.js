import Cart from "../models/cart.js"

export const createCart = async (req, res, next) => {
    try {
        const newCart = new Cart({
            userId: req.body.userId,
            products: req.body.products,
        });

        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        next(error);
    }
};


//update cart
export const updateCart = async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            message: "Cart  Updated Sucessfully",
            updatedCart
        });

    }
    catch (error) {
        next(error)
    }
}

// delete cart

export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted....");
    } catch (error) {
        next(error)
    }
}

//GET USER CART

export const getSingleCart = async (req, res, next) => {
    try {
        const userId = req.params.id
        const cart = await Cart.findOne({ userId });
        console.log(userId)
        res.status(200).json(cart);
    } catch (error) {
        next(error)
    }
}

//Get all carts 

export const getAllCart = async (req, res, next) => {
    try {
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}

