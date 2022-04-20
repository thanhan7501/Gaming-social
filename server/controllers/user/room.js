const Message = require('../../models/message');
const Game = require('../../models/game');

module.exports = {
    getRoomMessages: async (ctx) => {
        const id = ctx.params.id;
        if (!id) {
            return ctx.body = {
                status: false,
                message: 'room not found'
            }
        }

        const room = await Game.findById(id).lean()
        const messages = await Message.find({ game: id }).populate('user').lean();
        return ctx.body = {
            status: true,
            message: 'get messages success',
            data: {
                messages,
                room
            }
        }
    }
}