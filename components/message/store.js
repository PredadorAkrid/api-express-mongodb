const Model = require('./model');

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = {
                user: filterUser
            };
        }
        const messages = Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if (error) {
                reject(error);
                return false;
            }
            resolve(populated);
        })
        /*.catch((error) => {
            reject(error);
        });*/
    });
    
}


async function updateText(id, message) {
    const foundMessage = await Model.findOne({ _id: id})
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id, message) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    removeMessage: removeMessage
}
