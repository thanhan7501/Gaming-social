const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profile = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    },
    share: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "share",
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("profile", profile);