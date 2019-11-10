import React, { Component } from "react"
import MenuCourseItem from "./menu-course-item"
import Grid from "@material-ui/core/Grid"

export default class MenuCourseView extends Component {
  handleClick = (id, itemTitle) => {
    this.props.itemHandler(id, itemTitle)
  }

  render() {
    return this.props.courseItems.map(res => (
      <Grid item xs={4} key={res.id}>
        <MenuCourseItem
          id={res.id}
          category_id={res.category_id}
          itemTitle={res.title}
          itemDescription={res.description}
          itemPrice={res.price}
          itemType={res.type}
          itemHandler={this.handleClick}
          className="order-item"
        />
      </Grid>
    ))
  }
}
