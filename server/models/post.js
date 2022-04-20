const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "game",
        require: true,
    },
    content: {
        type: String,
        trim: true,
        require: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    postFile: [{
        type: String,
        trim: true,
    }],
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("post", post);