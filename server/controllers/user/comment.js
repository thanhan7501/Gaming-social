const Comment = require("../../models/comment");
const Post = require("../../models/post")
const User = require("../../models/user")

module.exports = (io, socket) => {

    createComment = async (payload) => {
        const { commentContent, postId } = payload;
        const user = socket.decoded.payload;
        const post = await Post.findOne({ _id: postId }).populate('user').lean();
        if (post) {
            const comment = new Comment({
                commentContent: commentContent,
                post: postId,
                user: user,
            });
            await comment.save()

            const newComment = await Comment.findOne({ _id: comment._id}).populate('user', '-password').lean()

            const payload = {
                newComment
            }
            socket.emit("comment:send", payload);
            socket.broadcast.emit("comment:broadcast", payload);
            
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
}