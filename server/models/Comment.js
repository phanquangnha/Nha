import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
    comment: {
        type: String,
        required: true,
    },
    blogId: {
        type: String,
    },
    podCastId: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Comment", CommentSchema);