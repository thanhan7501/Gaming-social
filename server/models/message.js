const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "game",
        required: true,
    },
    message: {
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

module.exports = mongoose.model("message", message);