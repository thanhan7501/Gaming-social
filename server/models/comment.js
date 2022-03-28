const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
    commentContent: {
        type: String,
        trim: true,
        require: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("comment", comment);