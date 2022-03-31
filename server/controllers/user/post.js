const Post = require("../../models/post");
const Comment = require("../../models/comment")

const getPath = (path) => {
    return process.env.BASE_URL + "/" + path[path.length - 2] + "/" + path[path.length - 1];
};

module.exports = {
    createPost: async (ctx) => {
        const { content, postFile, game } = ctx.request.body;
        const post = new Post({
            content: content,
            postFile: postFile,
            game: game,
        })
        const user = ctx.state.user;
        post.user = user._id

        await post.save();

        return (ctx.body = {
            status: true,
            message: "create post success"
        })
    },

    updatePost: async (ctx) => {
        const id = ctx.params.id;
        const { content } = ctx.request.body;

        if (!id) {
            return (ctx.body = {
                status: false,
                message: "no post id found"
            })
        }

        await Post.updateOne({ _id: id }, { content: content });
        return (ctx.body = {
            status: true,
            message: "update post success"
        })
    },

    deletePost: async (ctx) => {
        const id = ctx.params.id;

        if (!id) {
            return (ctx.body = {
                status: false,
                message: "no post id found"
            })
        }

        const deletePost = await Post.deleteOne({ _id: id });
        if (deletePost.deletedCount === 0) {
            return (ctx.body = {
                status: false,
                message: "no post found"
            })
        }

        return (ctx.body = {
            status: true,
            message: "delete post success"
        })
    },

    uploadFile: async (ctx) => {
        if (ctx.request.files.postFile) {
            let filePath
            for (let i = 0; i < ctx.request.files.postFile.length; i++) {
                let postFilePath = ctx.request.files.postFile[i].path.split("\\");
                filePath = getPath(postFilePath);
            }
            return (ctx.body = {
                status: true,
                message: "file path",
                filePath,
            })
        }

        return (ctx.body = {
            status: false,
            message: "no file path"
        })
    },

    getAllPost: async (ctx) => {
        const allPost = await Post.find({}).populate("user", "-password -createdAt -updatedAt -__v").populate("game", "-createdAt -updatedAt -__v").sort({ createdAt: "DESC" }).lean();
        return (ctx.body = {
            status: true,
            message: "get all posts success",
            allPost
        })
    },

    getPostDetail: async (ctx) => {
        const id = ctx.params.id;
        const post = await Post.findById(id).populate("user", "-password -createdAt -updatedAt -__v").populate("game", "-createdAt -updatedAt -__v").lean()
        const comment = await Comment.find({ post: post._id }).populate("user", "-password -createdAt -updatedAt -__v").lean();
        return (ctx.body = {
            status: true,
            message: "get post success",
            post,
            comment
        })
    },
}