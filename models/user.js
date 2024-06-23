import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,

    },
    streetnumber: {
        type: Number,

    },
    image: {
        type: String,
    },
    isAdmin: {
        type: String,
        default: false,
    }



}

)

export default mongoose.model("User", userSchema)