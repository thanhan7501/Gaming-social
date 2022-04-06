const Like = require("../../models/like");
const Post = require("../../models/post");

module.exports = {
    like: async (ctx) => {
        const { postId } = ctx.request.body;
        const userId = ctx.state.user._id;
        const like = new Like({
            user: userId,
            post: postId
        })

        await like.save();
        let likes = await Like.find({ post: postId }).count();
        likes = {
            likes,
            postId
        }
        return (ctx.body = {
            status: true,
            likes: likes,
            message: "like success"
        })
    },

    unlike: async (ctx) => {
        const postId = ctx.params.id;
        const userId = ctx.state.user._id;
        await Like.deleteOne({ post: postId, user: userId });

        let likes = await Like.find({ post: postId }).count();
        likes = {
            likes,
            postId
        }
        return (ctx.body = {
            status: true,
            likes: likes,
            message: "unlike success"
        })
    }
}