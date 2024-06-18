import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUser, getAllUser } from "../controllers/user.js";


const router = express.Router();

//get  user
router.get("/",verifyToken, getUser);
router.get("/list", getAllUser);






export default router;