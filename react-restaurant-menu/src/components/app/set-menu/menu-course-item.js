import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

export default class CourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      htmlTitle: this.props.itemTitle,
      htmlDescription: this.props.itemDescription,
      htmlPrice: this.props.itemPrice,
      courseID : this.props.id,
      categoryID: this.props.category_id,
      editable: false,
      deleted: false
    };
  };

  render() {
    return (
      <Card className="">
        <CardContent>
          <h6 value={this.state.htmlTitle}/>
        </CardContent>
      </Card>
    )
  }
}