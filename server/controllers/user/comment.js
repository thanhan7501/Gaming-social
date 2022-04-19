const Comment = require("../../models/comment");
const Post = require("../../models/post")
const utils = require("../../utils/joinUser")

module.exports = (io, socket) => {

    userJoin = async ({ roomId }) => {
        const userId = socket.decoded.payload;
        socket.join(roomId);
    }

    createComment = async (payload) => {
        const { commentContent, postId } = payload;
        const userId = socket.decoded.payload;
        const post = await Post.findOne({ _id: postId }).populate('user').lean();
        if (post) {
            const comment = new Comment({
                commentContent: commentContent,
                post: postId,
                user: userId,
            });
            await comment.save()

            const newComment = await Comment.findOne({ _id: comment._id}).populate('user', '-password').lean()

            io.to(postId).emit("comment:broadcast", newComment);
        }

        else {
            throw new Error('post not found');
        }
    }

    socket.on("comment:create", createComment);
    socket.on("joinRoom", userJoin)
}