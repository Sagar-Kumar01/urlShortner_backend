import express from "express";
const router = express.Router();
import authVerifyMiddleware from "../middlewares/authVerify.middleware.js";
import { createShortUrl, getUrlAnalytics, redirectToLongUrl } from "../controllers/url.js";




router.post("/short", authVerifyMiddleware, createShortUrl);

router.get("/analytics/:code", authVerifyMiddleware, getUrlAnalytics);

router.get("/:code", redirectToLongUrl);


export default router;