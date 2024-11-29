let users = [];

const addUser = (socketId, name, roomId) => {
    users.push({id: socketId, name, roomId})
    return users;
}

const getUser = (socketId) => {
    return users.find((user) => user.id === socketId) || {}
}

const getUsers = (roomId) => users.filter((user) => user.roomId === roomId)

const removeUser = (socketId) => {
    return users = users.filter((user) => user.id !== socketId)
}

module.exports = {addUser, removeUser, getUser, getUsers}