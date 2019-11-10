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
        return (selectedItems[res.category_id] = [])
      })
    }
    this.setState({
      courseItems,
      selectedItems
    })
  }

  handleItems = (id, itemTitle, itemDescription) => {
    let { selectedItems } = this.state
    const { course } = this.props
    const item = { id: id, title: itemTitle, description: itemDescription }
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

  handleShowSummary = () => {
      this.props.summaryHandler()
  }

  handleChangeOrder = () => {
    this.props.changeCourse()
    this.props.summaryHandler()
  }

  handleSaveMenu = () => {
  //  this.props.handleSaveMenu()
    var newMenu = []
    alert(JSON.stringify(this.state.selectedItems))
    for (var category_id in this.state.selectedItems)
    {
      this.state.selectedItems[category_id].forEach(function(course, index){
        newMenu.push(course);
      });
    }
    superagent
      .post('http://localhost:9000/login/login/saveMenu')
      .set('Content-Type','application/json')
      .send({ newMenu })
      .end((error,response) => {
        if (response.status == 200)
        {
          alert(response.body.message);
        }
        console.log(response)
        console.log(error)
      })
  }

  render() {
    if (this.props.summary) {
      return (
        <div className="summary-container">
          <OrderSummary selectedItems={this.state.selectedItems} />
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
          <Button className="button default" variant="contained" onClick={this.handleShowSummary} > 
            Show Complete Order
          </Button>
        </div>
      )
    }
  }
}
