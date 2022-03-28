const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const game = new Schema({
    gameName: {
        type: String,
        require: true,
    },
    gameAvatar: {
        type: String,
        trim: true,
        require: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("game", game);