import React, { Component } from "react"

export default class CategoriesButton extends Component {
  handleClick = () => {
    this.props.clickHandler(this.props.course)
  }

  render() {
    return (
      <button className={`button ${this.props.className} ${this.props.active ? '-active' : ""}`} onClick={this.handleClick}>
        {this.props.courseName}
      </button>
    )
  }
}
