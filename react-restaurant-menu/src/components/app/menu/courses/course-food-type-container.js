import React, { Component } from "react"
import getCourseItems from "../../../../utils/courseItem"
import CourseView from "./course-view"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import superagent from 'superagent';
import CourseFoodType from "./course-food-type";

export default class CourseFoodTypeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
        editable: this.props.editable,
        itemType: this.props.itemType
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

  render() {
      return (
        <div className="order-container">
            <Grid container spacing={1}>
                <Grid>
                    <CourseFoodType {...this.state} course={this.props.course} />
                </Grid>
            </Grid> 
        </div>
      )
    }
  }
