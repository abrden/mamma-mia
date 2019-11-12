import React, { Component } from "react"

import "../app.scss"
import CategoryContainer from "../category";

export default class Categories extends Component {
  render() {
    return (
      <main className="app">
        <h1 className="title">
          Mamma Mia! Restaurant - Food Categories
        </h1>
        {
          <CategoryContainer/>
        }
      </main>
    )
  }
}
