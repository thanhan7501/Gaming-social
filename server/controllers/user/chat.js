const User = require("../../models/user")
const Message = require("../../models/message")

module.exports = (io, socket) => {
    chat = async (payload) => {
        const { newMessage, roomId } = payload;
        const userId = socket.decoded.payload;
        if (roomId) {
            const message = new Message({
                user: userId,
                game: roomId,
                message: newMessage,
            });
            await message.save()

            const userChat = await Message.findOne({ _id: message._id}).populate('user', '-password').lean()

            io.to(roomId).emit("chat:broadcast", userChat);
        }
        else {
            socket.emit("error", "Something went wrong")
        }
    }

    socket.on("chat", chat);
}