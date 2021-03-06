const Post = require("../../models/post");
const Profile = require("../../models/profile");
const Comment = require("../../models/comment");
const Like = require("../../models/like");
const sendEmail = require("../../middleware/nodemailer")

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
        });
        const user = ctx.state.user;
        post.user = user._id;

        const profile = new Profile({
            user: user._id,
            post: post._id
        });

        await post.save();
        await profile.save();

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
        const user = ctx.state.user;

        if (!id) {
            return (ctx.body = {
                status: false,
                message: "no post id found"
            })
        }

        const deletePost = await Post.findOneAndDelete({ _id: id }).populate('user');
        const deleteProfile = await Profile.findOneAndDelete({ post: id });
        if (!deletePost) {
            return (ctx.body = {
                status: false,
                message: "no post found"
            })
        }

        if (user.isAdmin === true) {
            sendEmail({
                to: deletePost.user.email,
                subject: "Social Gaming",
                html: "<p>Your post has been deleted by the admin as it was believed to be violated the community standards</p>",
            });
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
        let sort = ctx.query.sort;
        let page = ctx.query.page;
        const pageSize = 5;
        const totalRecord = await Post.find({}).count().lean();
        let post;
        if (!page) {
            return (ctx.body = {
                status: false,
                message: "page not found",
            })
        }
        const skip = (page - 1) * pageSize;
        if (sort === "view") {
            post = await Post.find({})
                .skip(skip)
                .limit(pageSize)
                .populate("user", "-password -createdAt -updatedAt -__v")
                .populate("game", "-createdAt -updatedAt -__v")
                .sort({ viewCount: "DESC" }).lean();
        }
        else if (sort === 'like') {
            post = await Post.find({})
                .skip(skip)
                .limit(pageSize)
                .populate("user", "-password -createdAt -updatedAt -__v")
                .populate("game", "-createdAt -updatedAt -__v")
                .sort({ likeCount: "DESC" }).lean();
        }
        else {
            post = await Post.find({})
                .skip(skip)
                .limit(pageSize)
                .populate("user", "-password -createdAt -updatedAt -__v")
                .populate("game", "-createdAt -updatedAt -__v")
                .sort({ createdAt: "DESC" }).lean();
        }
        const totalPage =
            totalRecord % pageSize === 0
                ? parseInt(totalRecord / pageSize)
                : parseInt(totalRecord / pageSize) + 1;

        return (ctx.body = {
            status: true,
            message: "get all posts success",
            totalPage,
            totalRecord,
            post
        })
    },

    getPostDetail: async (ctx) => {
        const id = ctx.params.id;
        const userId = ctx.state.user._id;
        await Post.updateOne({ _id: id }, { $inc: { viewCount: 1 } })
        if (!id) {
            return (ctx.body = {
                status: false,
                message: "post not found",
            })
        }
        const post = await Post.findById(id)
            .populate("user", "-password -createdAt -updatedAt -__v")
            .populate("game", "-createdAt -updatedAt -__v")
            .lean()
        const comment = await Comment.find({ post: id }).populate("user", "-password -__v").sort({ createdAt: "DESC" }).lean();
        const likes = await Like.find({ post: id }).count();
        const userLike = await Like.findOne({ user: userId, post: id }).count();
        const liked = userLike === 1 ? true : false;
        return (ctx.body = {
            status: true,
            message: "get post success",
            post,
            comment,
            likes,
            liked
        })
    },
}