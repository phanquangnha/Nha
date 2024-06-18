import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    desc: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

export default mongoose.model("Blog", UserSchema);