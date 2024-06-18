import express from "express";
import { createComment, getCommentForBlog, getCommentForPodCast } from "../controllers/comment.js";

const router = express.Router();

//create a podcast
router.post("/", createComment);

router.get("/blog/:id", getCommentForBlog);

router.get("/podcasts/:id", getCommentForPodCast);

export default router;