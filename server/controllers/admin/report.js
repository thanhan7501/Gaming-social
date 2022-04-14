const Report = require('../../models/report')

module.exports = {
    getAllReport: async (ctx) => {
        const report = await Report.find({}).populate('reportedUser', '-password -__v').populate('post', '-__v').lean();
        return (ctx.body = {
            status: true,
            message: 'get all report success',
            data: {
                report
            }
        })
    },
}