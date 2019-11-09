const jsonfile = require('jsonfile');
const fs = require('fs');
const crypter = require('bcrypt');

const SALT_ROUNDS = 10
const USERS_DIR = "./data/users/users_database.json"
const FEEDBACKS_DIR = "./data/saved_messages/messages_of_feedback.json"
const CATEGORIES_DIR = "src/assets/data/categories.json"
const crypto = require("crypto");

class UserHandler {

	static getUsers() {
		let users = fs.readFileSync(USERS_DIR);
		let usersJson = JSON.parse(users);
		return usersJson;
	}

	static getComments() {
		let comments = fs.readFileSync(FEEDBACKS_DIR);
		let commentsJson = JSON.parse(comments);
		console.log("COMMENTS JSON", commentsJson)
		return commentsJson;
	}

	static hashPassword(pass) {
		let salt = crypter.genSaltSync(SALT_ROUNDS);
		return crypter.hashSync(pass, salt);
	}

	static findUserByEmail(email) {
		let usersJson = this.getUsers();
		return usersJson.filter(user => user["email"] == email);
	}

	static findUserByName(name) {
		let usersJson = this.getUsers();
		return usersJson.filter(user => user["email"] == email);
	}

	static saveUser(email, password) {
		if (this.findUserByEmail(email).length > 0) {
			return { "status": 422, "message": "El usuario ya está registrado." };
		}

		let usersJson = this.getUsers();
		let hashedPassword = this.hashPassword(password);

        usersJson.push({ "email": email, "hashedPassword": hashedPassword })
        fs.writeFileSync(USERS_DIR, JSON.stringify(usersJson));

        return { "status": 200, "message": "Usuario registrado exitosamente." };
	}

	static findHashedPasswordForEmail(email) {
		let usersJson = this.findUserByEmail(email);
		if (usersJson.length == 0) {
			return ''
		}
		else {
			return usersJson[0]['hashedPassword'];
		}
	}

	static saveMessage(name, message) {
	/* 	if(message === ''){
			return { "status": 422, "message": "El usuario ya está registrado." };
		} */
		let messagesJson = this.getComments();
		//let hashedPassword = this.hashPassword(password);

        messagesJson.push({ "name": name, "message": message })
        fs.writeFileSync(FEEDBACKS_DIR, JSON.stringify(messagesJson));

        return { "status": 200, "message": "Comentario registrado exitosamente." };
	}

	static getCategories() {
		let categories = fs.readFileSync(CATEGORIES_DIR);
		let categoriesJson = JSON.parse(categories);
		return categoriesJson;
	}

	static saveCategory(category_id, name) {
		let categoriesJson = this.getCategories();
		if (category_id == null){
			category_id = crypto.randomBytes(16).toString("hex"); //Creo un nuevo ID unico para la categoria
			categoriesJson[category_id] = name;
		}
		else{
			categoriesJson[category_id] = name;
		}
		fs.writeFileSync(CATEGORIES_DIR, JSON.stringify(categoriesJson));

		return { "status": 200, "message": "Categoria guardada exitosamente.", "category_id":category_id };
	}

	static deleteCategory(category_id){
		let categoriesJson = this.getCategories();
		delete categoriesJson[category_id];
		fs.writeFileSync(CATEGORIES_DIR, JSON.stringify(categoriesJson));

		return { "status": 200, "message": "Categoria borrada exitosamente." };
	}
}

module.exports.model = {};
module.exports.model.UserHandler = UserHandler;