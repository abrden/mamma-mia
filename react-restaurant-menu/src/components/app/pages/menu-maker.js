import React, { Component } from "react"
import Order from "../order"
import Steps from "../steps"

import "../app.scss"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      course: "0",
      summary: false
    }
  }

  handleCourse = (course = "0") => {
    console.log(course)
    this.setState({ course })
  }

  handleSummary = () => {
    this.setState({ summary: !this.state.summary })
  }

  render() {
    return (
      <main className="app">
        <h1 className="title">
          {this.state.summary ? "Today's Set Menu: " : "Mamma mia! - Create Set Menu"}
        </h1>
        <p>{this.state.summary ? "Our new combination of courses made with love for you. Includes beverages" : "Select the courses you want for today's set menu"}</p>
        <Steps
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
        <Order
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
      </main>
    )
  }
}
