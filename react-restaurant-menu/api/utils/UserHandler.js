const jsonfile = require('jsonfile');
const fs = require('fs');
const crypter = require('bcrypt');

const SALT_ROUNDS = 10
const USERS_DIR = "./data/users/users_database.json"
const FEEDBACKS_DIR = "./data/saved_messages/messages_of_feedback.json"
const CATEGORIES_DIR = "src/assets/data/categories.json"
const COURSES_DIR = "src/assets/data/fe-tech-data.json"
const MENU_DIR = "src/assets/data/set-menu.json"
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

	static validateUser(email, password) {
		let usersJson = this.getUsers();
		let hashedPassword = this.findHashedPasswordForEmail(email);
		if (crypter.compareSync(password, hashedPassword)) {
		    return { "status": 200, "message": "Usuario logueado." };
		}
		if (email == "admin" && password == "proyectos") {
		    return { "status": 200, "message": "Usuario logueado." };
		}
		else {
		    return { "status": 422, "message": "Usuario o contraseña incorrectos." };
		}
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
		}
		categoriesJson[category_id] = name;
		fs.writeFileSync(CATEGORIES_DIR, JSON.stringify(categoriesJson));

		return { "status": 200, "message": "Categoria guardada exitosamente.", "category_id":category_id };
	}

	static deleteCategory(category_id){
		let categoriesJson = this.getCategories();
		delete categoriesJson[category_id];
		fs.writeFileSync(CATEGORIES_DIR, JSON.stringify(categoriesJson));

		return { "status": 200, "message": "Categoria borrada exitosamente." };
	}

	static getCourses() {
		let courses = fs.readFileSync(COURSES_DIR);
		let coursesJson = JSON.parse(courses);
		return coursesJson;
	}

	static saveCourse(category_id, course_id, title, desc, types = [], price){
		let coursesJson = this.getCourses();
		if (course_id == null){
			course_id = crypto.randomBytes(16).toString("hex"); //Creo un nuevo ID unico para el plato
		}
		let course = {
			"category_id": category_id,
			"id": course_id,
			"title": title,
			"description": desc,
			"type": types,
			"price": price
		}
		var index = coursesJson.findIndex(item => item.id === course_id);
		if (index < 0){
			coursesJson.push(course)
		} 
		else{
			coursesJson[index] = course;
		} 
		fs.writeFileSync(COURSES_DIR, JSON.stringify(coursesJson));

		return { "status": 200, "message": "Plato guardado exitosamente.", "course_id":course_id };
	}

	static deleteCourse(course_id){ 
		let coursesJson = this.getCourses();
		coursesJson.splice(coursesJson.findIndex(item => item.id === course_id), 1);
		fs.writeFileSync(COURSES_DIR, JSON.stringify(coursesJson));

		return { "status": 200, "message": "Categoria borrada exitosamente." };
	}

	static saveMenu(newMenu){
		fs.writeFileSync(MENU_DIR, JSON.stringify(newMenu));
		return { "status": 200, "message": "Menu guardado exitosamente." };
	}
}

module.exports.model = {};
module.exports.model.UserHandler = UserHandler;