let express = require('express');
let FileHandler = require('../utils/FileHandler').model.FileHandler;
let UserHandler = require('../utils/UserHandler').model.UserHandler;
let router = express.Router();

router.route('/saveUser').post((request, response) => {
    let jsonData = request.body;
    let email = jsonData['email'];
    let password = jsonData['password'];

    let result = UserHandler.saveUser(email, password);
    response.status(result['status']).send(result['message']);
});

router.route('/login').post((request, response) => {
    let jsonData = request.body;
    let email = jsonData['email'];
    let password = jsonData['password'];

    let result = UserHandler.validateUser(email, password);
    response.status(result['status']).send(result['message']);
});

module.exports = router;