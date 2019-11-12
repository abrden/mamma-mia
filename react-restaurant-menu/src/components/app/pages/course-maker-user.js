import React, { Component } from "react"
import OrderUser from "../menu/coursesUser"
import Steps from "../menu/categories"

import "../app.scss"

export default class CoursesUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: "0",
      summary: false
    }
  }

  handleCourse = (course = 0) => {
    console.log(course)
    this.setState({ course })
  }

  handleSummary = () => {
    this.setState({ summary: !this.state.summary })
  }

  render() {
    return (
      <main className="app">
        <div>
          <h1 className="title">Mamma mía! - Restaurant Menu</h1>
          <p>All of our delicious food options sorted by categories</p>
        </div>
        <div>
          <Steps {...this.state} changeCourse={this.handleCourse} />
          <OrderUser {...this.state} changeCourse={this.handleCourse} />
        </div>
      </main>
    )
  }
}
