let express = require('express');
let FileHandler = require('../utils/FileHandler').model.FileHandler;
let UserHandler = require('../utils/UserHandler').model.UserHandler;
let router = express.Router();

const FEEDBACKS_DIR = "./data/saved_messages/"

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

router.route('/feedback').post((request, response) => {
    let jsonData = request.body; 
    let name = jsonData['name'];
    let message = jsonData['message'];

    let result = UserHandler.saveMessage(name, message);
    response.status(result['status']).send(result['message']);
    
});

router.route('/saveUser').post((request, response) => {
    let jsonData = request.body;
    let email = jsonData['email'];
    let password = jsonData['password'];

    let result = UserHandler.saveUser(email, password);
    response.status(result['status']).send(result['message']);
});

router.route('/saveCategory').post((request, response) => {
    let jsonData = request.body;
    let name = jsonData['name'];
    let id = jsonData['category_id'];
    let result = UserHandler.saveCategory(id, name);
    response.status(result['status']).send({ message:result['message'], category_id:result['category_id']});
});

router.route('/deleteCategory').post((request, response) => {
    let jsonData = request.body;
    let id = jsonData['category_id'];
    let result = UserHandler.deleteCategory(id);
    response.status(result['status']).send({ message:result['message']});
});

module.exports = router;