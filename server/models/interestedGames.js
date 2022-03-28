const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestedGames = new Schema({
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
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("interestedGames", interestedGames);