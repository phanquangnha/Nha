import Blog from "../models/Blog.js";

function capitalizeFirstLetter(text) {
    return text.replace(/^.|\n./g, function (match) {
        return match.toUpperCase();
    });
}

export const showListBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ category: capitalizeFirstLetter(req.params.name) });
        res.status(200).json(blogs);
    } catch (err) {
        next(err);
    }
};

export const showListAllBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (err) {
        next(err);
    }
};

export const getDetailBlog = async (req, res, next) => {
    try {
        const user = await Blog.findById(req.params.id).populate("idUser")
        res.status(200).json(user);
    } catch (err) {
        console.log(req.user)
        next(err);
    }
}

export const searchBlog = async (req, res, next) => {
    try {
        const user = await Blog.find({ name: req.params.q }).populate("idUser")
        res.status(200).json(user);
    } catch (err) {
        console.log(req.user)
        next(err);
    }
}


export const updateBlog = async (req, res, next) => {
    try {
        const updateBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updateBlog);
    } catch (err) {
        next(err);
    }
}

export const deleteBlog = async (req, res, next) => {
    const query = req.params.id;

    try {
        const logs = await Blog.deleteOne({ _id: query });
        res.status(200).json(logs);
    } catch (err) {
        next(err);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        const blogs = new Blog(
            {
                name: req.body.name,
                desc: req.body.desc,
                thumbnail: req.body.thumbnail,
                idUser: req.body.idUser,
                category: req.body.category
            }
        );
        const savedPodcast = await blogs.save();

        if (savedPodcast) {
            res.status(200).json('create success');
        }

    } catch (error) {
        next(error);
    }
}