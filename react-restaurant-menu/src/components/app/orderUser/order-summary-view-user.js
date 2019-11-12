import React, { Component } from "react"

export default class OrderSummaryViewUser extends Component {
  render() {
    return (
      <div className="order-summary-view-user">
        <h4 className="title">{this.props.courseTitle}</h4>
        <ul>
          {this.props.courseItems.map(item => (
            <li key={item.id} >{item.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}
