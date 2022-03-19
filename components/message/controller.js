const store =  require('./store')
const socket = require('../../socket').socket;
function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject)=> {
        if (!chat || !user || !message) {
            console.error("[messageController] No hay usuario o mensaje")
            reject("Los datos son incorrectos");
            return false;
        }

        let fileUrl = '';
        
        if (file) {
            fileUrl = 'http://localhost:3000/app/public/files/'+ file.filename;
        }
        const fullMessage = {
            chat: chat,
            user:user,
            message: message,
            date: new Date(),
            file: fileUrl
        };
        store.add(fullMessage)

        socket.io.emit('Message', fullMessage);

        resolve(fullMessage);
        return true;
    }); 
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id)
            console.log(message)
            if (!id || !message) {
                reject("Invalid data")
                return false;
            } 
            const result = await store.updateText(id, message)
            resolve(result);
        } catch (error) {
            reject(error)
        }
    });
 
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Parámetros o id inválido')
            return false;
        }
        store.removeMessage(id)
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    });
 
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};