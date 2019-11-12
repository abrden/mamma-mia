import React, { Component } from "react"
import OrderItem from "./order-item"
import Grid from "@material-ui/core/Grid"
import getItemIndex from "../../../utils/itemIndex"

export default class OrderView extends Component {
  handleClick = (id, itemTitle, itemDescription) => {
    this.props.itemHandler(id, itemTitle, itemDescription)
  }

  render() {
    return this.props.courseItems.map(res => (
      <Grid item xs={4} key={res.id}>
        <OrderItem
          id={res.id}
          category_id={res.category_id}
          itemTitle={res.title}
          itemDescription={res.description}
          itemPrice={res.price}
          itemType={res.type}
          itemHandler={this.handleClick}
          className="order-item"
          selected={
            getItemIndex(this.props.selectedItems[this.props.course], res.id) >= 0
          }
        />
      </Grid>
    ))
  }
}
