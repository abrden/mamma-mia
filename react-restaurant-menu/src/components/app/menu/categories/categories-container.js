import React, { Component } from "react"
import { getAllCourseNames } from "../../../../utils/courseName"
import CategoriesButtonPanel from "./categories-button-panel"

export default class CategoriesContainer extends Component {
  handleClick = course => {
      this.props.changeCourse(course)
  }

  render() {
    return (
      <div className="steps-container">
        <CategoriesButtonPanel
          courses={getAllCourseNames()}
          clickHandler={this.handleClick}
          activeCourse={this.props.course}
        />
      </div>
    )
  }
}
