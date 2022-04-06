const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "required_email"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid_email"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'required_password']
  },
  fullName: {
    type: String,
    trim: true,
    default: null,
    required: [true, 'required_fullname']
  },
  avatarUrl: {
    type: String,
    trim: true,
    default: 'http://localhost:7000/uploads/default-avatar.png',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  interestedGames: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

module.exports = mongoose.model("user", user);