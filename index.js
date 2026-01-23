import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


import urlRoutes from "./routes/url.js"
import userRoutes from "./routes/user.route.js"
import connectDB from "./connection.js"

dotenv.config();
const app = express();
await connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/url",urlRoutes);
app.use("/user",userRoutes);


let PORT = process.env.PORT || 5500
app.listen(PORT,()=>{
    console.log("server running at",PORT)
})