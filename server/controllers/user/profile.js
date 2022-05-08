const Post = require("../../models/post");
const Profile = require("../../models/profile");
const User = require("../../models/user");

module.exports = {
    getUserPost: async (ctx) => {
        const userId = ctx.params.id;
        const post = await Profile.find({ user: userId })
            .populate("user", "-password -createdAt -updatedAt -__v")
            .populate({
                path: "post",
                populate: {
                    path: "game",
                    select: "-createdAt -updatedAt -__v"
                }
            })
            .populate({
                path: "post",
                populate: {
                    path: "user",
                    select: "-password -createdAt -updatedAt -__v",
                },
            })
            .lean()
        // const post = await Post.find({ user: userId })
        //     .populate("user", "-password -createdAt -updatedAt -__v")
        //     .populate("game", "-createdAt -updatedAt -__v")
        //     .sort({ createdAt: "DESC" })
        //     .lean();

        const userProfile = await User.findOne({ _id: userId }).select("-__v -createdAt -updatedAt -password").lean()
        return (ctx.body = {
            status: true,
            message: "get profile success",
            post,
            userProfile,
        })
    },

    changeAvatar: async (ctx) => {
        const { avatarUrl } = ctx.request.body;
        const userId = ctx.state.user._id;
        await User.updateOne({ _id: userId }, { avatarUrl: avatarUrl });

        return (ctx.body = {
            status: true,
            message: "change avatar success",
        })
    }
}