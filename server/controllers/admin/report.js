const Report = require('../../models/report')

module.exports = {
    getAllReports: async (ctx) => {
        const reports = await Report.find({}).populate('reportedUser', '-password -__v').populate('post', '-__v').lean();
        return (ctx.body = {
            status: true,
            message: 'get all report success',
            data: {
                reports
            }
        })
    },
}