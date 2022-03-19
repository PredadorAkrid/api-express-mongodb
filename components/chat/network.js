const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/:id', function (req, res) {
    controller
    .listChats(req.params.userId)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    }).catch((error) => {
        response.error(req, res, 'Unexpected error', 500, error);
    });
});



router.post('/', function (req, res) {
    controller.addChat(req.body.users)
    .then((data) => {
        response.success(req, res, data, 201);
    })
    .catch((error) => {
        console.log(error)
        response.error(req, res, 'Información inválida', 500, err);
    })
});


module.exports = router;