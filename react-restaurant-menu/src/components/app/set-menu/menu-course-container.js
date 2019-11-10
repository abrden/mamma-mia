import React, { Component } from "react"
import getCourseItems from "../../../utils/courseItem"
import MenuCourseView from "./menu-course-view"
import Grid from "@material-ui/core/Grid"

export default class MenuCourseContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseItems: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(props) {
    if (this.props !== props) {
      this.fetchData()
    }
  }

  fetchData = () => {
    const jsonData = require("../../../assets/data/set-menu.json")
    const courseItems = getCourseItems(jsonData, this.props.course)

    this.setState({
      courseItems
    })
  }

  handleChangeOrder = () => {
    this.props.changeCourse()
    this.props.summaryHandler()
  }

  render() {
      return (
        <div className="order-container">
            <Grid container spacing={3}>
              <MenuCourseView {...this.state} course={this.props.course} />
            </Grid> 
        </div>
      )
    }
  }
