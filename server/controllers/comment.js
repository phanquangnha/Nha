import mongoose from "mongoose";
import { createError } from "../error.js";
import Podcasts from "../models/Podcasts.js";
import Episodes from "../models/Episodes.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";


export const createComment = async (req, res, next) => {
    try {
        // Create a new comment
        const  podCastId = req.body.podCastId ;
        const  blogId = req.body.blogId ;
        if (podCastId || blogId) {
            const newComment = new Comment(
                {
                    podCastId: req.body.podCastId,
                    blogId: req.body.blogId,
                    creator: req.body.user_id,
                    comment: req.body.comment
                }
            );
            const savedComment = await newComment.save();
            res.status(201).json({
                status: 201,
                savedComment
            });
        }
        else{
            res.status(400).json({
                status: 400,
                message: 'BlogId or Podcast Id is required'
            });
        }
    } catch (err) {
        next(err);
    }
};


export const getCommentForBlog = async (req, res, next) => {
    try {
        const BlogId = req.params.id;
        const list = await Comment.find({ blogId: BlogId })
            .populate("creator", "name img")
            .sort({ createdAt: 1 });
        return res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const getCommentForPodCast = async (req, res, next) => {
    try {
        const PodCastId = req.params.id;
        const list = await Comment.find({ podCastId: PodCastId })
            .populate("creator", "name img")
            .sort({ createdAt: 1 });
        return res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};



// not usse 
export const addepisodes = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        await Promise.all(req.body.episodes.map(async (item) => {

            const episode = new Episodes(
                { creator: user.id, ...item }
            );
            const savedEpisode = await episode.save();


            // update the podcast
            await Podcasts.findByIdAndUpdate(
                req.body.podid, {
                $push: { episodes: savedEpisode.id },

            }, { new: true }
            )
        }));

        res.status(201).json({ message: "Episode added successfully" });

    } catch (err) {
        next(err);
    }
}


export const getPodcastById = async (req, res, next) => {
    try {
        // Get the podcasts from the database
        const podcast = await Podcasts.findById(req.params.id).populate("creator", "name img").populate("episodes");
        return res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

export const favoritPodcast = async (req, res, next) => {
    // Check if the user is the creator of the podcast
    const user = await User.findById(req.user.id);
    const podcast = await Podcasts.findById(req.body.id);
    let found = false;
    if (user.id === podcast.creator) {
        return next(createError(403, "You can't favorit your own podcast!"));
    }

    // Check if the podcast is already in the user's favorits
    await Promise.all(user.favorits.map(async (item) => {
        if (req.body.id == item) {
            //remove from favorite
            found = true;
            console.log("this")
            await User.findByIdAndUpdate(user.id, {
                $pull: { favorits: req.body.id },

            }, { new: true })
            res.status(200).json({ message: "Removed from favorit" });

        }
    }));


    if (!found) {
        await User.findByIdAndUpdate(user.id, {
            $push: { favorits: req.body.id },

        }, { new: true });
        res.status(200).json({ message: "Added to favorit" });
    }
}

//add view 

export const addView = async (req, res, next) => {
    try {
        await Podcasts.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};



//searches
export const random = async (req, res, next) => {
    try {
        const podcasts = await Podcasts.aggregate([{ $sample: { size: 40 } }]).populate("creator", "name img").populate("episodes");
        res.status(200).json(podcasts);
    } catch (err) {
        next(err);
    }
};

export const mostpopular = async (req, res, next) => {
    try {
        const podcast = await Podcasts.find().sort({ views: -1 }).populate("creator", "name img").populate("episodes");
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const podcast = await Podcasts.find({ tags: { $in: tags } }).populate("creator", "name img").populate("episodes");
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

export const getByCategory = async (req, res, next) => {
    const query = req.query.q;
    try {
        const podcast = await Podcasts.find({

            category: { $regex: query, $options: "i" },
        }).populate("creator", "name img").populate("episodes");
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const podcast = await Podcasts.find({
            name: { $regex: query, $options: "i" },
        }).populate("creator", "name img").populate("episodes").limit(40);
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};


export const deletePostCard = async (req, res, next) => {
    const query = req.params.id;

    console.log(query);
    try {
        const podcast = await Podcasts.deleteOne({ _id: query });
        res.status(200).json(podcast);
    } catch (err) {
        next(err);
    }
};