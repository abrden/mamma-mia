import React, { Component } from "react"
import Menu from "../set-menu"

import "../app.scss"

export default class App extends Component {

  render() {
    return (
      <main className="app">
        <h1 className="title">
          Today's Set Menu
        </h1>
        <p>Our new combination of courses made with love for you. Includes beverages and coffee</p>
        <Menu/>
      </main>
    )
  }
}
