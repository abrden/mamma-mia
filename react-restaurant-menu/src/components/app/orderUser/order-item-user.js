import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CourseFoodType from "../menu/courses/course-food-type"

export default class OrderItemUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courseID : this.props.id,
      categoryID: this.props.category_id,
    };
  };

  handleClick = () => {
    this.props.itemHandler(this.props.id, this.props.itemTitle, this.props.itemDescription)
  }

  render() {
    return (
      <Card
        className={`${this.props.className} ${this.props.selected ? "-selected" : ""}`}
      >
        <CardActionArea onClick={this.handleClick}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className="item-title"
            >
              {this.props.itemTitle}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="item-desc"
            >
              {this.props.itemDescription}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="item-info"
            > 
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="item-info"
            >
              Price: ${this.props.itemPrice}
            </Typography>
            <CourseFoodType 
              editable={false} 
              itemType={this.props.itemType} />
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}