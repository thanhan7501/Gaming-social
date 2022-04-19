const User = require("../../models/user")

module.exports = (io, socket) => {
    chat = async (payload) => {
        const { newMessage, roomId } = payload;
        const userId = socket.decoded.payload;
        const user = await User.findById(userId);
        const userChat = {
            user,
            newMessage
        }

        io.to(roomId).emit("chat:broadcast", userChat);
    }

    socket.on("chat", chat);
}