import mongoose from "mongoose";
 

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
        // unique:true
    },
    img:{
        type:String,
        // required:true,
    },
    size:{
        type:String,
        

    },
    category:{
        type:Array,
    },
    colour:{
        type:String,
    },
    desc:{
        type:String,
        required:true,

    },



},{timestamps:true})

export default mongoose.model("Product",productSchema)