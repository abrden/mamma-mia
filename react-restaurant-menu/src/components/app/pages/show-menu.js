import React, { Component } from "react"
import Menu from "../set-menu"

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
          Today's Set Menu
        </h1>
        <p>Our new combination of courses made with love for you. Includes beverages</p>
        <Menu
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
      </main>
    )
  }
}
