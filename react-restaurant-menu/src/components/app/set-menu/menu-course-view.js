import React, { Component } from "react"
import MenuCourseItem from "./menu-course-item"
import Grid from "@material-ui/core/Grid"

export default class MenuCourseView extends Component {
  constructor(props) {
    super(props)
  };

  render() {
    return this.props.courseItems.map((res, key) => (
      <Grid item xs={6} key={key}>
        <MenuCourseItem itemTitle={res.title} itemDescription={res.description} className="order-item"/>
      </Grid>
    ))
  }
}
