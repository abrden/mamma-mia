const courses = getCoursesFromFile();

function getCoursesFromFile() {
  const jsonData = require("../assets/data/categories.json")
  return jsonData
}

function getCourseName(number) {
  return courses[number]
}

function getAllCourseNames() {
  return courses;
}

export { getAllCourseNames, getCourseName, getCoursesFromFile }
