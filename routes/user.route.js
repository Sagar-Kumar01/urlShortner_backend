import express from "express";
const userRoutes = express.Router();

import { handelSignup, handelLogin } from "../controllers/user.controller.js";

userRoutes.post("/signup", handelSignup);
userRoutes.post("/login", handelLogin);

export default userRoutes;

