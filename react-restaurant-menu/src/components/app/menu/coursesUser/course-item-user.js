import React, { Component } from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from '@material-ui/core/CardActions';
import ContentEditable from 'react-contenteditable'
import superagent from 'superagent';
import CourseFoodType from "../courses/course-food-type"

export default class CourseItemUser extends Component {
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

  handleClick = () => {
    this.props.itemHandler(this.props.id, this.props.itemTitle)
  }

  handleTitleChange = evt => {
    this.setState({ htmlTitle: evt.target.value });
  };

  handleDescriptionChange = evt => {
    this.setState({ htmlDescription: evt.target.value });
  };

  handlePriceChange = evt => {
    this.setState({ htmlPrice: evt.target.value });
  };

  toggleEditable = () => {
    if(this.state.editable) {
      this.setState({ editable: !this.state.editable }, this.updateCategoriesList);
      let course = {
        course_id : this.state.courseID,
        category_id : this.state.categoryID,
        description : this.state.htmlDescription.replace("<br>",""),
        price       : this.state.htmlPrice.replace("<br>",""),
        title       : this.state.htmlTitle.replace("<br>",""),
        type        : []
      }
      superagent
        .post('http://localhost:9000/login/login/saveCourse')
        .set('Content-Type','application/json')
        .send(course)
        .end((error,response) => {
          if (response.status == 200)
          {
            alert(response.body.message);
          }
          console.log(response)
          console.log(error)
      })
    }
    else
    { 
      this.setState({ editable: !this.state.editable });
    }
  };

  handleRemoval = () => {
    superagent
        .post('http://localhost:9000/login/login/deleteCourse')
        .set('Content-Type','application/json')
        .send({course_id:this.state.courseID})
        .end((error,response) => {
          if (response.status == 200)
          {
            alert(response.body.message);
          }
          console.log(response)
          console.log(error)
      })
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
          <ContentEditable className={!this.state.editable ? "" : "editable"} html={"Price: $" + this.state.htmlPrice.toString()} disabled={!this.state.editable} onChange={this.handlePriceChange} />
          <p value={this.state.htmlPrice} onChange={this.handlePriceChange}/>
          <CourseFoodType editable={this.state.editable} itemType={this.props.itemType} />
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    )
  }
}