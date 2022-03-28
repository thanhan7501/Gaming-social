const Like = require("../../models/like");
const Post = require("../../models/post");

module.exports = (io, socket) => {
    like = async (payload) => {
        const { postId } = payload;
        const userId = socket.decoded.payload;
        const like = new Like({
            user: userId,
            post: postId
        })

        await like.save();
        let likes = await Like.find({ post: postId }).count();
        likes = {
            ...likes,
            postId
        }
        socket.emit("like", likes)
    }

    unlike = async (payload) => {
        const { postId } = payload;
        const userId = socket.decoded.payload;
        await Like.deleteOne({ post: postId, user: userId });
        let likes = await Like.find({ post: postId }).count();
        likes = {
            ...likes,
            postId
        }
        socket.emit("like", likes)
    }

    socket.on("like:create", like);
    socket.on("like:delete", unlike);
}