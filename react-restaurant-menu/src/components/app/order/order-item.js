import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardMedia from "@material-ui/core/CardMedia"
import GlutenFree from "../../../images/gluten_free.png"
import Veggie from "../../../images/veggie.png"
export default class OrderItem extends Component {
  handleClick = () => {
    this.props.itemHandler(this.props.id, this.props.itemTitle)
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
            {
              this.props.itemType.map((type,index) => {
                return (
                <CardMedia
                  className="type-image"
                  component="img"	
                  alt={`${type}`}	
                  image={`${getImagePathFromType(type)}`}		
                  key={index}
                />)
              })
            }
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

function getImagePathFromType(type){
  if (type === "veggie") return Veggie
  if (type === "gluten_free") return GlutenFree
}