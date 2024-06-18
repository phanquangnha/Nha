import express from "express";
import { createBlog,showListBlog,
    getDetailBlog,
    updateBlog,
    deleteBlog,
    searchBlog,
    showListAllBlog} from "../controllers/blog.js";


const router = express.Router();

//create a podcast
router.post("/", createBlog);
//get all podcasts
router.get("/all", showListAllBlog);
router.get("/:name", showListBlog);
//get podcast by id
router.get("/get/:id",getDetailBlog)
router.get("/search/:q",searchBlog)

//add episode to a 
router.put("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id",deleteBlog); 




export default router;