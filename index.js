import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
const app =express()

dotenv.config()
mongoose.set("strictQuery",true)

//using middlewares
app.use(express.json())


const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to Alpaviram Database")
    } catch (error) {
        console.log(error)
    }
}

//routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)


const port=process.env.PORT||8000

app.listen(port,()=>{
    connect()
    console.log(`Server is working on port ${port}`)
})