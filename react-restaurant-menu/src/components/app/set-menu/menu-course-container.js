import React, { Component } from "react"
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
    const courseItems = jsonData

    this.setState({
      courseItems
    })
  }

  render() {
    if (this.state.courseItems.length > 0){
      return (
        <div className="order-container">
            <Grid container spacing={3} direction="column">
              <MenuCourseView {...this.state}/>
            </Grid> 
        </div>
      )} else {
        return (
          <div className="order-container">
            <p>We are working on a new menu for you!</p>
         </div>
        )
      }
    }
  }
