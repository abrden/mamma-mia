import React, { Component } from "react"
import CategoryItem from "./category-item"
import Grid from "@material-ui/core/Grid"
import superagent from 'superagent';

export default class CategoryView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoriesList: this.props.name
    };
    this.updateCategoriesList = this.updateCategoriesList.bind(this)
  };

  updateCategoriesList = (updatedCategory) => {
    if (updatedCategory.deleted){
      superagent
        .post('http://localhost:9000/login/login/deleteCategory')
        .set('Content-Type','application/json')
        .send({category_id:updatedCategory.categoryID})
        .end((error,response) => {
          if (response.status === 200)
          {
            alert(response.body.message);
          }
          console.log(response)
          console.log(error)
      })
    }
    else if (updatedCategory.updated){
      superagent
        .post('http://localhost:9000/login/login/saveCategory')
        .set('Content-Type','application/json')
        .send({name:updatedCategory.html.replace("<br>",""), category_id:updatedCategory.categoryID})
        .end((error,response) => {
          if (response.status === 200)
          {
            alert(response.body.message);
          }
          console.log(response)
          console.log(error)
      })
    }
    else{

    }
  }

  render() {
    return Object.keys(this.props.name).map((res,index) => (
      <Grid item xs={4} key={res}>
        <CategoryItem id={res} categoryTitle={this.props.name[res]} className="order-item" updateCategoriesList={this.updateCategoriesList}/>
      </Grid>
    ))
  }
}
