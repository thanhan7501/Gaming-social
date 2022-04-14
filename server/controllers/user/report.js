const Report = require('../../models/report')

module.exports = {
    reportPost: async (ctx) => {
        const { postId } = ctx.request.body;
        const userId = ctx.state.user.user._id;
        const report = new Report({
            reportedUser: userId, 
            post: postId
        })
        await report.save();

        return (ctx.body = {
            status: true,
            message: 'report post success'
        })
    },
}