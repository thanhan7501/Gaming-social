const Message = require('../../models/message')

module.exports = {
    getRoomMessages: async (ctx) => {
        const id = ctx.params.id;
        if (!id) {
            return ctx.body = {
                status: false,
                message: 'room not found'
            }
        }

        const messages = await Message.find({ game: id }).populate('user').lean();
        return ctx.body = {
            status: true,
            message: 'get messages success',
            data: {
                messages
            }
        }
    }
}