const Comment = require("../../models/comment");
const Post = require("../../models/post")
const User = require("../../models/user")
const utils = require("../../utils/joinUser")

module.exports = (io, socket) => {

    userJoin = async ({ userId, roomId }) => {
        const user = utils.joinUser(socket.id, userId, roomId);
        socket.join(user.roomId);
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

    deleteComment = async (payload) => {
        const { commentId, postId } = payload;
        if (!commentId) {
            throw new Error('comment not found');
        }

        await Comment.deleteOne({ _id: commentId })
    }

    updateComment = async (payload) => {
        const { commentContent, commentId, postId } = payload;

        if (!commentId || commentContent) {
            throw new Error('comment not found');
        }

        const comment = await Comment.findOneAndUpdate({ _id: commentId }, { commentContent: commentContent });

        socket.broadcast.emit("comment:fix", comment)
    }


    socket.on("comment:create", createComment);
    socket.on("comment:delete", deleteComment);
    socket.on("comment:update", updateComment);
    socket.on("joinRoom", userJoin)
}