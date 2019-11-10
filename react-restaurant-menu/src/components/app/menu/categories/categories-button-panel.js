import React, { Component } from "react"
import CategoriesButton from "./categories-button"

export default class CategoriesButtonPanel extends Component {
  handleClick = course => {
    this.props.clickHandler(course)
  }

  render() {
    return Object.keys(this.props.courses).map((id,index) => (
      <CategoriesButton
        key={id}
        course={id}
        courseName={this.props.courses[id]}
        clickHandler={this.handleClick}
        className="steps"
        active={this.props.activeCourse === id}
      />
    ))
  }
}
