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
        await Post.updateOne({ _id: postId }, { $inc: { likeCount: 1 } });
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
        const deleteAction = await Like.deleteOne({ post: postId, user: userId });
        if (deleteAction.deletedCount === 1) {
            await Post.updateOne({ _id: postId }, { $inc: { likeCount: -1 } });
        }
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