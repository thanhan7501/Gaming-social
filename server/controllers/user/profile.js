const Post = require("../../models/post")

module.exports = {
    getUserPost: async (ctx) => {
        const userId = ctx.state.user._id;
        const post = await Post.find({ user: userId })
            .populate("user", "-password -createdAt -updatedAt -__v")
            .populate("game", "-createdAt -updatedAt -__v")
            .lean()

        return (ctx.body = {
            status: true,
            message: "get profile success",
            post,
        })
    }
}