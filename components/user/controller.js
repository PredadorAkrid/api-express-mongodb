const store = require('./store');

function listUsers() {
    return store.listUsers();
}

function addUser(name) {
    if (!name) {
        return Promise.reject("Invalid name");
    }
    const user = {
        name: name
    }
    return store.add(user)
}
module.exports = {
    addUser: addUser,
    listUsers: listUsers
}