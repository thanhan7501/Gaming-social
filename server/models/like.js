const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const like = new Schema({
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
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("like", like);