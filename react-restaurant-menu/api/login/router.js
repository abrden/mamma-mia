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
/*
router.route('/saveMenu').post((request, response) => {
    let jsonData = request.body; 
    let fs = require('fs');
    fs.writeFileSync("../../src/assets/data/setMenu.json",jsonData)
    response.status(result['status']).send(result['message']);
});
*/
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

router.route('/saveCourse').post((request, response) => {
    let jsonData = request.body;
    let course_id = jsonData['course_id'];
    let category_id = jsonData['category_id'];
    let title = jsonData["title"];
    let desc = jsonData["description"];
    let price = jsonData["price"];
    let types = jsonData["types"];
    let result = UserHandler.saveCourse(category_id, course_id, title, desc, types, price);
    response.status(result['status']).send({ message:result['message'], course_id:result['course_id']});
});

router.route('/deleteCourse').post((request, response) => {
    let jsonData = request.body;
    let course_id = jsonData['course_id'];

    let result = UserHandler.deleteCourse(course_id);
    response.status(result['status']).send({ message:result['message']});
});

router.route('/saveMenu').post((request, response) => {
    let menu = request.body.newMenu;
    let result = UserHandler.saveMenu(menu);
    response.status(result['status']).send({ message:result['message']});
});

module.exports = router;