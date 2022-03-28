const Post = require("../../models/post");

const getPath = (path) => {
    return process.env.BASE_URL + "/" + path[path.length - 2] + "/" + path[path.length - 1];
};

module.exports = {
    createPost: async (ctx) => {
        const
        const post = new Post(ctx.request.body)
        const user = ctx.state.user;
        post.user = user.user._id

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
                message: "delete post success",
                filePath,
            })
        }

        return (ctx.body = {
            status: false,
            message: "no file path"
        })
    }
}