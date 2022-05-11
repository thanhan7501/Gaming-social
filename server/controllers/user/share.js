const Profile = require("../../models/profile");

module.exports = {
    createShare: async (ctx) => {
        const { post } = ctx.request.body;
        console.log(ctx.request.body)
        if(!post) {
            return (ctx.body = {
                status: false,
                message: "post not found"
            })
        }
        const user = ctx.state.user;
        const profile = new Profile({
            user: user._id,
            post: post,
            isOwner: false,
        });
        await profile.save();
        return (ctx.body = {
            status: true,
            message: "share post success"
        })
    },

    deleteShare: async (ctx) => {
        
    }
}