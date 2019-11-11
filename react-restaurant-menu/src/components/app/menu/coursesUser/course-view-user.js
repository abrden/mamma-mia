import React, { Component } from "react"
import CourseItemUser from "./course-item-user"
import Grid from "@material-ui/core/Grid"

export default class CourseViewUser extends Component {
  handleClick = (id, itemTitle) => {
    this.props.itemHandler(id, itemTitle)
  }

  render() {
    return this.props.courseItems.map(res => (
      <Grid item xs={4} key={res.id}>
        <CourseItemUser
          id={res.id}
          category_id={res.category_id}
          itemTitle={res.title}
          itemDescription={res.description}
          itemPrice={res.price}
          itemType={res.type}
          itemHandler={this.handleClick}
          className="order-item-user"
        />
      </Grid>
    ))
  }
}
