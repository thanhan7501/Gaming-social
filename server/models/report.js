const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const report = new Schema({
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        require: true,
    },
    reason: {
        type: String,
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});

module.exports = mongoose.model("report", report);