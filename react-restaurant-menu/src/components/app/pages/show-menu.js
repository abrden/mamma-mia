import React, { Component } from "react"
import Menu from "../set-menu"

import "../app.scss"

export default class App extends Component {

  getPrice(){
    return (Math.random() * (400 - 300) + 300).toFixed(2);
  }

  handleCourse = (course = "0") => {
    console.log(course)
    this.setState({ course })
  }

  render() {
    return (
      <main className="app">
        <h1 className="title">
          Today's Set Menu
        </h1>
        <p>Our new combination of courses made with love for you. Includes beverages and coffee</p>
        <Menu/>
        <p>Price for today's menu: ${this.getPrice()}</p>
      </main>
    )
  }
}
