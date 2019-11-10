import React, { Component } from "react"
import { getCourseName } from "../../../utils/courseName"
import OrderSummaryView from "./order-summary-view"

export default class OrderSummary extends Component {

  handleSaveMenu = () => {
    console.log(this.props)
    /*let menu = JSON.stringify({
      courses: items.selectedItems,
      price: this.getPrice()
    })
    console.log(menu)

    superagent
      .post('http://localhost:9000/login/login/saveMenu')
      .set('Content-Type','application/json')
      .send(menu)
      .end((error,response) => {
        console.log(response)
        console.log(error)
    })*/
  }

  render() {
    const { selectedItems } = this.props
    return Object.keys(selectedItems).map(item => {
      if (selectedItems[item].length !== 0) {
        let courseItems = []
        for (let i = 0; i < selectedItems[item].length; i++) {
          courseItems.push(selectedItems[item][i])
        }
        return (
          <OrderSummaryView
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
