const Report = require('../../models/report')

module.exports = {
    reportPost: async (ctx) => {
        const { postId, reason } = ctx.request.body;
        const userId = ctx.state.user._id;
        const report = new Report({
            reportedUser: userId, 
            post: postId,
            reason: reason,
        })
        await report.save();

        return (ctx.body = {
            status: true,
            message: 'report post success'
        })
    },
}