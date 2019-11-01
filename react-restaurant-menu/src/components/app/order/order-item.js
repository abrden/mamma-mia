import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

export default class OrderItem extends Component {
  handleClick = () => {
    this.props.itemHandler(this.props.id, this.props.itemTitle)
  }

  render() {
    return (
      <Card
        className={`${this.props.className} ${
          this.props.selected ? "-selected" : ""
        }`}
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
              className="item-info"
            >
              Spice Level: {this.props.itemSpiceLevel}, 
              Allergies: {this.props.itemAllergy.map(allergy => 
                  `${allergy} `
                )}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className="item-desc"
            >
              {this.props.itemDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}
