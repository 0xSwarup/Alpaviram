//creat order

import order from "../models/order";

export const createOrder = async (req, res, next) => {
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedCart);

    } catch (error) {
        next(error)
    }
}

//update order
export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            message: "Order  Updated Sucessfully",
            updatedOrder
        });

    }
    catch (error) {
        next(error)
    }
}

// delete Order

export const deleteOrder = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted....");
    } catch (error) {
        next(error)
    }
}

//GET USER orders

export const singleOrder = async (req, res, next) => {
    try {
        const order = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(order);
    } catch (error) {
        next(error)
    }

}

//Get all orders

export const Order = async (req, res, next) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
}

