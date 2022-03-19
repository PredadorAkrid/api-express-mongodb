const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');


router.get('/', function (req, res) {
    controller.listUsers()
    .then((userList) => {
        response.success(req, res, userList, 200);
    }).catch((error) => {
        response.error(req, res, 'Unexpected error', 500, error);
    });
});


router.post('/', function(req, res) {
    controller.addUser(req.body.name)
    .then((data) => {
        response.success(req, res, data, 201);
    })
    .catch((error) => {
        response.error(req, res, 'Internal error', 500, error);
    })
})

module.exports = router;