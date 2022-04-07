const users = [];

module.exports = {
    joinUser: (id, userId, roomId) => {
        const user = { id, userId, roomId };
        users.push(user);
        return user;
    },

    getCurrentUser: (id) => {
        return users.find((user) => user.id === id);
    },

    userLeave: (id) => {
        const index = users.findIndex((user) => user.id === id);

        if (index !== -1) {
          return users.splice(index, 1)[0];
        }
    }
}