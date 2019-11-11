import React, { Component } from "react"
import { getCourseName } from "../../../utils/courseName"
import OrderSummaryViewUser from "./order-summary-view-user"

export default class OrderSummaryUser extends Component {

  render() {
    const { selectedItems } = this.props
    return Object.keys(selectedItems).map(item => {
      if (selectedItems[item].length !== 0) {
        let courseItems = []
        for (let i = 0; i < selectedItems[item].length; i++) {
          courseItems.push(selectedItems[item][i])
        }
        return (
          <OrderSummaryViewUser
            key={item}
            courseTitle={getCourseName(item)}
            courseItems={courseItems}
            handleSaveMenu={this.handleSaveMenu}
          />
        )
      }
    })
  }
}
