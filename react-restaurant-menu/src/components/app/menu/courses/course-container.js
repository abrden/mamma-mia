import React, { Component } from "react"
import getCourseItems from "../../../../utils/courseItem"
import CourseView from "./course-view"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import superagent from 'superagent';

export default class CourseContainer extends Component {
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
    const jsonData = require("../../../../assets/data/fe-tech-data.json")
    const courseItems = getCourseItems(jsonData, this.props.course)

    this.setState({
      courseItems
    })
  }

  handleChangeOrder = () => {
    this.props.changeCourse()
    this.props.summaryHandler()
  }

  handleNewCourse= () => {
     const newCourse = { category_id : this.props.course,
                         description : "New course for Mamma Mía Restaurant!",
                         id          : null,
                         price       : 0.00,
                         title       : "New Course",
                         type        : [] }
    superagent
      .post('http://localhost:9000/login/login/saveCourse')
      .set('Content-Type','application/json')
      .send(newCourse)
      .end((error,response) => {
        var courseId = response.body.course_id
        console.log(response)
        console.log(error)
    })

    const newCourseItems = [...this.state.courseItems, newCourse];

    this.setState({
      courseItems: newCourseItems
    });
  }

  render() {
      return (
        <div className="order-container">
            <Grid container spacing={3}>
              <CourseView {...this.state} course={this.props.course} itemHandler={this.handleItems} />
            </Grid> 
            <Button className="button default" variant="contained" size="small" color="default" onClick={this.handleNewCourse}>
              <AddIcon/> New Course
            </Button>
        </div>
      )
    }
  }
