import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ContentEditable from 'react-contenteditable'
import Button from '@material-ui/core/Button';
import GlutenFree from "../../../../images/gluten_free.png"
import Veggie from "../../../../images/veggie.png"

export default class CourseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      htmlTitle: this.props.itemTitle,
      htmlDescription: this.props.itemDescription,
      htmlPrice: this.props.itemPrice,
      //categoryID: this.props.id,
      editable: false,
      deleted: false
    };
    //this.updateCategoriesList = this.updateCategoriesList.bind(this);
  };

  handleClick = () => {
    this.props.itemHandler(this.props.id, this.props.itemTitle)
  }

  handleTitleChange = evt => {
    console.log(evt.target.value)
    this.setState({ htmlTitle: evt.target.value });
  };

  handleDescriptionChange = evt => {
    console.log(evt.target.value)
    this.setState({ htmlDescription: evt.target.value });
  };

  handlePriceChange = evt => {
    console.log(evt.target.value)
    this.setState({ htmlPrice: evt.target.value });
  };

  toggleEditable = () => {
    if(this.state.editable) this.setState({ editable: !this.state.editable }, this.updateCategoriesList);
    else this.setState({ editable: !this.state.editable });
  };

  handleRemoval = () => {
    this.setState({ deleted: true }, /*this.updateCategoriesList*/);
  }

  render() {
    return (
      <Card className={`${this.props.className} ${!this.state.deleted ? "" : "hidden"}`}>
        <CardContent>
          <ContentEditable className={!this.state.editable ? "" : "editable"} html={this.state.htmlTitle} disabled={!this.state.editable} onChange={this.handleTitleChange} />
          <h6 value={this.state.htmlTitle} onChange={this.handleTitleChange}/>
          <ContentEditable className={!this.state.editable ? "" : "editable"} html={this.state.htmlDescription} disabled={!this.state.editable} onChange={this.handleDescriptionChange} />
          <p value={this.state.htmlDescription} onChange={this.handleDescriptionChange}/>
          <ContentEditable className={!this.state.editable ? "" : "editable"} html={this.state.htmlPrice.toString()} disabled={!this.state.editable} onChange={this.handlePriceChange} />
          <p value={this.state.htmlPrice} onChange={this.handlePriceChange}/>
          
            {
              this.props.itemType.map((type,index) => {
                return (
                  <CardMedia className="type-image" component="img"	alt={`${type}`}	image={`${getImagePathFromType(type)}`}	key={index}/>
                )
              })
            }
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" color="default" onClick={this.toggleEditable}>
            <EditIcon/> {!this.state.editable ? "Edit" : "Save"}
          </Button>
          <Button variant="contained" size="small" color="default" onClick={this.handleRemoval}>
            <DeleteIcon/> Remove
          </Button>
        </CardActions>
      </Card>
    )
  }
}

function getImagePathFromType(type){
  if (type === "veggie") return Veggie
  if (type === "gluten_free") return GlutenFree
}