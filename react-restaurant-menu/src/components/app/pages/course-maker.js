import React, { Component } from "react"
import Order from "../menu/courses"
import Steps from "../menu/categories"

import "../app.scss"

export default class Courses extends Component {
  constructor(props) {
    console.log("cargue courses");
    super(props)
    this.state = {
      course: "0",
      summary: false
    }
  }

  handleCourse = (course = 0) => {
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
          <Order {...this.state} changeCourse={this.handleCourse} />
        </div>
      </main>
    )
  }
}
