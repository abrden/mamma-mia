import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

export default class MenuCourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemTitle: this.props.itemTitle,
      itemDescription: this.props.itemDescription
    };
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" className="item-title">{this.state.itemTitle}</Typography>
          <Typography gutterBottom variant="body2" component="p" className="item-desc">{this.state.itemDescription}</Typography>
        </CardContent>
      </Card>
    )
  }
}