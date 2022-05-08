const Profile = require("../../models/profile");

module.exports = {
    createShare: async (ctx) => {
        const { post } = ctx.request.body;
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