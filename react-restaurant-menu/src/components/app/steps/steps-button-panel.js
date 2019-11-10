import React, { Component } from "react"
import StepsButton from "./steps-button"

export default class ButtonPanel extends Component {
  handleClick = course => {
    this.props.clickHandler(course)
  }

  render() {
    return Object.keys(this.props.courses).map((id) => (
      <StepsButton
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
