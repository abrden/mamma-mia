import React, { Component } from "react"
import OrderUser from "../orderUser"
import Steps from "../steps"

import "../app.scss"

export default class AppUser extends Component {
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
      <main className="appUser">
        <h1 className="title">
          {this.state.summary ? "Today's Set Menu: " : "Mamma mia! - Create Set Menu"}
        </h1>
        <p>{this.state.summary ? "Our new combination of courses made with love for you. Includes beverages" : "Select the courses you want for today's set menu"}</p>
        <Steps
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
        <OrderUser
          {...this.state}
          changeCourse={this.handleCourse}
          summaryHandler={this.handleSummary}
        />
      </main>
    )
  }
}
