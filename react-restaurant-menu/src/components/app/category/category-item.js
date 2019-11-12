import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ContentEditable from 'react-contenteditable'
import Button from '@material-ui/core/Button';

export default class CategoryItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: this.props.categoryTitle,
      categoryID: this.props.id,
      editable: false,
      deleted: false
    };
    this.updateCategoriesList = this.updateCategoriesList.bind(this);
  };

  handleRemoval = () => {
    this.setState({ deleted: true }, this.updateCategoriesList);
  }

  handleChange = evt => {
    this.setState({ updated:true, html: evt.target.value });
  };

  toggleEditable = () => {
    if(this.state.editable) this.setState({ editable: !this.state.editable }, this.updateCategoriesList);
    else this.setState({ editable: !this.state.editable });
  };

  updateCategoriesList = () => {
    this.props.updateCategoriesList(this.state)
  }

  render() {
    return (
      <Card className={!this.state.deleted ? "" : "hidden"} >
        <CardContent>
            <ContentEditable className={!this.state.editable ? "" : "editable"} html={this.state.html} disabled={!this.state.editable} onChange={this.handleChange} />
            <h2 value={this.state.html} onChange={this.handleChange}/>
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