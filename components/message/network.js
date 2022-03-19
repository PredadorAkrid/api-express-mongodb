const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


router.get('/', function (req, res) {
    const filterMessages = req.query.chat || null;
    controller
    .getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    }).catch((error) => {
        response.error(req, res, 'Unexpected error', 500, error);
    });
});



router.post('/', upload.single('file'), function (req, res) {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    })
    .catch((error) => {
        response.error(req, res, 'Información inválida', 500, error);

    })
});


router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 201);
    })
    .catch((error) => {
        console.log(error)
        response.error(req, res, 'Información inválida', 400, 'Error en el controlador');
    })
});

router.delete('/:id', function (req, res) {
    console.log("Entra")
    controller.deleteMessage(req.params.id)
    .then((data) => {
        response.success(req, res, `Mensaje ${req.params.id} eliminado`, 201);
    })
    .catch((error) => {
        console.log(error)
        response.error(req, res, 'Información inválida', 400, 'Error en el controlador');
    })
});

module.exports = router;