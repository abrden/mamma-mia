import React, { Component } from "react"
import getCourseItems from "../../../utils/courseItem"
import OrderView from "./order-view"
import OrderSummary from "./order-summary"
import Grid from "@material-ui/core/Grid"
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import superagent from 'superagent';

export default class OrderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseItems: [],
      selectedItems: {},
      price: 0
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
    let { selectedItems } = this.state
    const jsonData = require("../../../assets/data/fe-tech-data.json")
    const courseItems = getCourseItems(jsonData, this.props.course)

    if (Object.entries(selectedItems).length === 0) {
      jsonData.map(res => {
        /* Add empty arrays for each course to add items later */
        return (selectedItems[res.category_id] = [])
      })
    }
    this.setState({
      courseItems,
      selectedItems
    })
  }

  handleItems = (id, itemTitle) => {
    let { selectedItems } = this.state
    const { course } = this.props
    const item = { id: id, title: itemTitle }

    if (selectedItems[course].length !== 0) {
      let index = selectedItems[course].findIndex(item => item.id === id)

      if (index >= 0) {
        selectedItems[course].splice(index, 1)
        this.setState({
          selectedItems
        })
        return
      }
    }

    selectedItems[course].push(item)

    this.setState({
      selectedItems
    })
  }

  handleNextCourse = () => {
    const { selectedItems } = this.state
    const { course } = this.props
    if (Object.keys(selectedItems).length - 1 !== course) {
      this.props.changeCourse(course + 1)
    } else {
      this.props.summaryHandler()
    }
  }

  handleChangeOrder = () => {
    this.props.changeCourse()
    this.props.summaryHandler()
  }

  getPrice(){
    return (Math.random() * (400 - 300) + 300).toFixed(2);
  }

  handleSaveMenu = () => {
    this.props.handleSaveMenu()
  }

  render() {
    if (this.props.summary) {
      return (
        <div className="summary-container">
          <OrderSummary selectedItems={this.state.selectedItems} />
          <p>Price: ${this.getPrice()}</p>
          <Button className="button default" variant="contained" size="small" color="default" onClick={this.handleSaveMenu}>
              <SaveIcon/> Save Menu
          </Button>
          <Button className="button default" variant="contained" size="small" color="default" onClick={this.handleChangeOrder}>
              <EditIcon/> Change Menu
          </Button>
        </div>
      )
    } else {
      return (
        <div className="order-container">
          <Grid container spacing={3}>
            <OrderView
              {...this.state}
              course={this.props.course}
              itemHandler={this.handleItems}
            />
          </Grid>
          <button className="button default" onClick={this.handleNextCourse}>
            {Object.keys(this.state.selectedItems).length - 1 !==
            this.props.course
              ? "Next course"
              : "Show complete order"}
          </button>
        </div>
      )
    }
  }
}
