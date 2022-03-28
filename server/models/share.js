const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const share = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        require: true,
    },
    content: {
        type: String,
        trim: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("share", share);